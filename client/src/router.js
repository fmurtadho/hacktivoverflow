import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question/:articleId',
      name: 'completequestion',
      component: () => import(/* webpackChunkName: "about" */ './views/Question.vue')
    },
    {
      path: '/edit/:articleId',
      name: 'editquestion',
      component: () => import(/* webpackChunkName: "about" */ './views/EditQuestion.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MyProfile.vue')
    },
    {
      path: '/myquestion',
      name: 'myquestion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MyQuestion.vue')
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/CreateQuestion.vue')
    },
    {
      path: '/authorprofile/:authorId',
      name: 'authorprofile',
      component: () => import(/* webpackChunkName: "about" */ './views/Author.vue')
    }
  ]
})
