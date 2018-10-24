<template>
    <!-- Blog Post -->
    <div>
        <div class="card mb-4" v-for="(question, index) in allQuestion.data" :key="index">
            <div class="card-body">
                <h2 class="card-title">{{question.title}}</h2>
                <!-- <p class="card-text" v-html="article.content.slice(0, 150) + ' ...'"></p> -->
                <router-link :to="`/article/${question._id}`" class="btn btn-primary">Read More &rarr;</router-link>
            </div>
            <div class="card-footer text-muted">
                <div v-html="'Posted on ' + question.createdAt.slice(0, 10)"></div>
                by
                <!-- <router-link :to="`/author/${question.author._id}`" >{{question.author.name}}</router-link> -->
                <router-link :to="{name : 'authorprofile', params : {authorId : question.author._id} }" >{{question.author.name}}</router-link>
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
      allQuestion: ''
    }
  },
  methods: {
    getAllQuestion () {

      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/questions`
      })
        .then((response) => {
          self.allQuestion = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getAllQuestion()
  },
  mounted () {
    this.getAllQuestion()
  },
  watch: {
    searchresult: function (val) {
      this.allQuestion.data = this.searchresult
    },
    categoryresult: function (val) {
      this.allQuestion.data = this.categoryresult
    }
  }
}
</script>

<style>

</style>
