<template>
    <!-- Blog Post -->
    <div>
        <div class="card mb-4" v-for="(question, index) in allQuestions.data" :key="index">
            <div class="card-body">
                <h2 class="card-title">{{question.title}}</h2>
                <!-- <p class="card-text" v-html="article.content.slice(0, 150) + ' ...'"></p> -->
                <router-link :to="`/question/${question._id}`" class="btn btn-primary">Read More &rarr;</router-link>
                <router-link :to="`/edit/${question._id}`" v-if="question.author._id === currentuser" class="btn btn-success ml-2">Edit </router-link>
                <button @click="deleteQuestion(question._id)" v-if="question.author._id === currentuser" class="btn btn-danger ml-2">Delete </button>
            </div>
            <div class="card-footer text-muted">
                <div v-html="'Posted on ' + question.createdAt.slice(0, 10)"></div>
                by
                <!-- <router-link :to="`/author/${question.author._id}`" >{{question.author.name}}</router-link> -->
                <router-link :to="`/authorprofile/${question.author._id}`" >{{question.author.name}}</router-link>
                <div class="text-right"><i class="far fa-thumbs-up"></i> {{question.upvotes.length}} <i class="far fa-thumbs-down ml-2"></i> {{question.downvotes.length}} <i class="far fa-comments ml-2"></i> {{question.answers.length}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'AllArticle',
  props: ['searchresult', 'categoryresult'],
  data () {
    return {
      // allQuestion: ''
      currentuser : ''
    }
  },
  computed : {
    allQuestions () {
      return this.$store.state.allQuestions
    },
    storeIsLogin(){
      return this.$store.state.storeislogin
    }
  },
  methods: {
    listAllQuestions(){
      this.$store.dispatch('getAllQuestions')
    },
    checkUser(){
      let user = localStorage.getItem('currentuser')
      if(user){
        this.currentuser = localStorage.getItem('currentuser')
        this.$store.commit('mutStoreIsLogin',true)
      }
    },
    deleteQuestion (todelete) {

      let self = this

      axios({
        method:'DELETE',
        url: `${config.port}/questions/${todelete}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        this.listAllQuestions()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.listAllQuestions()
  },
  mounted () {
    this.checkUser()
  },
  watch: {
    searchresult: function (val) {
      // this.allQuestion.data = this.searchresult
      this.$store.commit('searchQuestion',this.searchresult)
    },
    categoryresult: function (val) {
      // this.allQuestion.data = this.categoryresult
      this.$store.commit('searchByCategory',this.categoryresult)
    },
    storeIsLogin: function (val){
      this.currentuser = localStorage.getItem('currentuser')
      this.listAllQuestions()
    }
  }
}
</script>

<style>

</style>
