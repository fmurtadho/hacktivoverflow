<template>
    <!-- Comments Form -->
    <div class="card my-4">
      <h5 class="card-header">Edit Article</h5>
      <div class="card-body">
          <div class="form-group">
            Title :
            <input type="text" class="form-control" rows="3" v-model="input_title">
            <br>
            Description :
            <wysiwyg v-model="input_description"/>
            <br>
            <select v-model="input_category" name="Category">
              <option value="5bcee9e7599d582188ce7951">Cat</option>
              <option value="5bd01521f5baa85a411a012d">Dog</option>
            </select>
          </div>
          <button class="btn btn-primary" v-on:click="submitUpdate()">Submit Update</button>
      </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'editarticle',
  data () {
    return {
      token: '',
      input_title: '',
      input_description: '',

      input_category: ''
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

    getValue () {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/questions/${this.$route.params.articleId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          self.input_title = response.data.data.title
          self.input_description = response.data.data.description
          self.input_category = response.data.data.category._id
        })
        .catch((err) => {
          console.log(err)
        })
    },

    submitUpdate () {
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
        method: 'PUT',
        url: `${config.port}/questions/${this.$route.params.articleId}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
      .then((response) => {
        self.input_title = ''
        self.input_description = ''
        self.input_category = ''
        this.$router.push('/myarticle')
      })
    },
    addImage (link) {
      this.new_image = link.target.files[0]
    }
  },
  mounted () {
    this.checkToken()
    this.getValue()
  },
  created () {
    this.checkToken()
    this.getValue()
  }
}
</script>

<style>

</style>
