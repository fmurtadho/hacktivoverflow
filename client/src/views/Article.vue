<template>
    <div class="container">

      <div class="row">

        <!-- Post Content Column -->
        <div class="col-lg-8">

          <!-- Title -->
          <h1 class="mt-4">{{question.data.title}}</h1>

          <!-- Author -->
          <p class="lead">
            by
            <a href="#">{{question.data.author.name}}</a>
          </p>
          <p v-html="'Posted on ' + question.data.createdAt.slice(0, 10)"></p>

          <!-- Preview Image -->
          <!-- <img class="img-fluid rounded" v-bind:src="article.data.picture" alt=""> -->

          <hr>

          <!-- Post Content -->
          <p class="lead" v-html="question.data.description"></p>
          <br>
          <div class="text-right">
            <button v-if="currentuser !== question.data.author._id" class="btn btn-success" @click="upvoteQ(question.data._id)"><i class="fas fa-thumbs-up"></i> {{question.data.upvotes.length}}</button>
            <button v-if="currentuser !== question.data.author._id" class ="btn btn-danger ml-2 mr-3" @click="downvoteQ(question.data._id)"><i class="fas fa-thumbs-down"></i> {{question.data.downvotes.length}}</button>
            <button v-if="currentuser === question.data.author._id" class="btn btn-success" ><i class="fas fa-thumbs-up"></i> {{question.data.upvotes.length}}</button>
            <button v-if="currentuser === question.data.author._id" class ="btn btn-danger ml-2 mr-3"><i class="fas fa-thumbs-down"></i> {{question.data.downvotes.length}}</button>
          </div>
          <!-- <div v-html="article.data.content"></div> -->
          <hr>

          <!-- Comments Form -->
          <div class="card my-4" v-if="islogin === true">
            <h5 class="card-header">Post Answer:</h5>
            <div class="card-body text-right">
                <div class="form-group">
                  <textarea class="form-control" rows="3" v-model="inputanswer"></textarea>
                </div>
                <button class="btn btn-primary" v-on:click="submitComment()">Submit</button>
            </div>
          </div>

          <!-- Single Comment -->
          <div class="card-my-4 shadow-sm" v-for="(answer, index) in answers" :key="index">
            <h5 class="card-header">{{answer.author.name}} answer :</h5>
            <!-- <img class="d-flex mr-3 rounded-circle" style="max-height:50px;max-width:50px;" v-bind:src="answer.user.avatar" alt=""> -->
            <div class="card-body">
              <!-- <h5 class="mt-0"></h5> -->
              {{answer.description}}
              <br>
              <div class="text-right mt-5 ml-3">
                <button class="btn-sm btn-danger" @click="deleteAnswer(answer._id)" v-if="currentuser === answer.author._id && islogin === true"><i class="fas fa-trash-alt"></i></button>
                <button class="btn-sm btn-success ml-2" @click="upvoteA(answer._id)" v-if="currentuser !== answer.author._id && islogin === true"><i class="fas fa-thumbs-up"></i> {{answer.upvotes.length}}</button>
                <button class ="btn-sm btn-danger ml-2" @click="downvoteA(answer._id)" v-if="currentuser !== answer.author._id && islogin === true"><i class="fas fa-thumbs-down"></i> {{answer.downvotes.length}}</button>
                <button class="btn-sm btn-success ml-2" v-if="currentuser === answer.author._id && islogin === true"><i class="fas fa-thumbs-up"></i> {{answer.upvotes.length}}</button>
                <button class ="btn-sm btn-danger ml-2" v-if="currentuser === answer.author._id && islogin === true"><i class="fas fa-thumbs-down"></i> {{answer.downvotes.length}}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Widgets Column -->
        <sidebar></sidebar>

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->
</template>

<script>
import config from '@/config.js'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'completearticle',
  components: {
    Sidebar
  },
  props: ['islogin'],
  data () {
    return {
      question: '',
      inputanswer: '',
      answers: '',
      triggerevent: '',
      token: '',
      commentform: false,
      currentuser: localStorage.getItem('currentuser'),

      upvotes : '',
      downvotes : ''
    }
  },
  methods: {
    getArticle (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/questions/${id}`
      })
        .then((response) => {
          // console.log(response.data)
          // console.log('upvote',response.data.upvotes)
          // console.log('downvote',response.data.downvotes)
          self.question = response.data
          self.upvotes = self.question.data.upvotes.length
          self.downvotes = self.question.data.downvotes.length
          self.answers = self.question.data.answers
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitComment () {
      // console.log('submit comment')

      let self = this

      axios({
        method: 'POST',
        url: `${config.port}/answers/${this.$route.params.articleId}`,
        headers: {
          token: self.token
        },
        data: {
          description: self.inputanswer
        }
      })
        .then((response) => {
          self.inputanswer = ''
          self.triggerevent = response
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteAnswer (id) {
      let self = this

      console.log('siap delete',id)

      axios({
        method: 'DELETE',
        url: `${config.port}/answers/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log(response.data)
        self.triggerevent = response
      })
      .catch((err) => {
        console.log(err)
      })

    },
    checkToken () {
      let token = localStorage.getItem('token')
      if (token) {
        this.currentuser = localStorage.getItem('currentuser')
        this.token = token
        this.islogin = true
      } else {
        this.islogin = false
        this.currentuser = ''
      }
    },
    upvoteQ(id){
      let self = this

      axios({
        method : 'POST',
        url : `${config.port}/actions/upvotequestion/${id}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then((response)=>{
        self.triggerevent = ''
        self.triggerevent = response.data
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    downvoteQ(id){

      let self = this

      axios({
        method : 'POST',
        url : `${config.port}/actions/downvotequestion/${id}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then((response)=>{
        self.triggerevent = ''
        self.triggerevent = response.data
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    upvoteA(id){
      let self = this

      axios({
        method : 'POST',
        url : `${config.port}/actions/upvoteanswer/${id}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then((response)=>{
        self.triggerevent = ''
        self.triggerevent = response.data
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    downvoteA(id){
      let self = this

      axios({
        method : 'POST',
        url : `${config.port}/actions/downvoteanswer/${id}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then((response)=>{
        self.triggerevent = ''
        self.triggerevent = response.data
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  created () {
    this.getArticle(this.$route.params.articleId)
    this.checkToken()
  },
  mounted () {
    this.checkToken()
  },
  watch: {
    triggerevent: function (val) {
      this.getArticle(this.$route.params.articleId)
    },
    islogin: function (val) {
      this.checkToken()
      this.getArticle(this.$route.params.articleId)
    },
    currentuser: function (val) {
      this.getArticle(this.$route.params.articleId)
    }
  }
}
</script>

<style>

</style>
