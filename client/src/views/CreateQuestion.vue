<template>
    <!-- Comments Form -->
    <div class="card my-4">
        <div class="alert alert-success" v-if="success === true" role="alert">
            Upload Success!
        </div>
        <div class="alert alert-danger" v-if="failed === true" role="alert">
            Upload Failed :(
        </div>
        <h5 class="card-header">Post Question</h5>
        <div class="card-body">
            <div class="form-group">
                Title :
                <input type="text" class="form-control" rows="3" v-model="input_title">
                <br>
                Description :
                <wysiwyg v-model="input_description"/>
                <br>
                Category :
                <br>
                <select v-model="input_category" name="Category">
                  <option v-for="(category, index) in all_categories" :key="index" :value="category._id" > 
                    {{category.name}} 
                  </option>
                </select>
            </div>
            <button class="btn btn-primary" @click="submitQuestion()">Submit</button>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'createarticle',
  props: ['islogin'],
  data () {
    return {
      token: '',
      input_title: '',
      input_description: '',

      input_category: '',

      uploading: false,
      success: false,
      failed: false
    }
  },
  computed : {
      all_categories(){
        return this.$store.state.allCategories
    }
  },
  methods: {
    checkToken () {
      let token = localStorage.getItem('token')
      this.token = token

      if (token == null) {
        this.$router.push('/')
      }
    },
    submitQuestion () {
      let title = this.input_title
      let description = this.input_description
      let category = this.input_category
      
      let self = this

      let data = {
        title,
        description,
        category
      }
      axios({
        method: 'POST',
        url: `${config.port}/questions/create`,
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
      .then((response) => {
        self.success = true
        self.input_title = ''
        self.input_description = ''
        self.input_category = ''
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted () {
    this.checkToken()
  },
  created () {
    this.checkToken()
  },
  watch : {
    islogin : function(val) {
      this.checkToken()
    }
  }
}
</script>

<style>

</style>
