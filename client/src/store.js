import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allQuestions : '',
    allCategories : ''
  },
  mutations: {
    mutAllQuestions(state,payload){
      state.allQuestions = payload
    },
    mutAllCategories(state,payload){
      state.allCategories = payload
    },
    searchQuestion(state,payload){
      state.allQuestions.data = payload
    },
    searchByCategory(state,payload){
      state.allQuestions.data = payload
    }
  },
  actions: {
    getAllCategories(state,payload){
      axios({
        method: 'GET',
        url: `${config.port}/categories/`
      })
      .then((response) => {
        state.commit('mutAllCategories',response.data)
      })
      .catch((err) => {
        console.log('error in getting all cateogories',err)
      })
    },
    getAllQuestions(state,payload){
      axios({
        method:'GET',
        url:`${config.port}/questions/`
      })
      .then((response)=>{
        state.commit('mutAllQuestions',response.data)
      })
      .catch((err)=>{
        console.log('error in getting all questions',err)
      })
    }
  }
})
