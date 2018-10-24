<template>
    <!-- Blog Post -->
    <div>
        <div class="card mb-4" v-for="(question, index) in myquestion" :key="index">
            <!-- <img class="card-img-top" v-bind:src="article.picture" alt="Card image cap"> -->
            <div class="card-body">
                <h2 class="card-title">{{question.title}}</h2>
                <!-- <p class="card-text" v-html="article.content.slice(0, 150) + ' ...'"></p> -->
                <router-link :to="`/article/${question._id}`" class="btn btn-primary">Read </router-link>
                <router-link :to="`/edit/${question._id}`" class="btn btn-success ml-2">Edit </router-link>
                <button @click="deleteQuestion(question._id)" class="btn btn-danger ml-2">Delete </button>
            </div>
            <div class="card-footer text-muted">
                <div v-html="'Posted on ' + question.createdAt.slice(0, 10)"></div>
                <!-- by
                <a href="#">{{article.author.name}}</a> -->
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'myarticle',
  props: ['islogin'],
  data () {
    return {
      myquestion: '',
      triggerChange: ''
    }
  },
  methods: {
    getMyQuestion () {

      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/questions/my`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        self.myquestion = response.data.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteQuestion (id) {
      console.log('siap delete ',id)

      let self = this

      axios({
        method:'DELETE',
        url: `${config.port}/questions/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        self.triggerChange = response.data
      })
      .catch((err) => {
        console.log(err)
      })

    },
    checkToken () {
      let token = localStorage.getItem('token')
      this.token = token

      if (token == null) {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.getMyQuestion()
  },
  mounted () {
    this.getMyQuestion()
    this.checkToken()
  },
  watch: {
    triggerChange: function (val) {
      this.getMyQuestion()
    },
    islogin: function (val) {
      this.checkToken()
    }
  }

}
</script>

<style>

</style>
