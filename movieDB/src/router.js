import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Movie from './views/Movie.vue'
import AddMovie from './views/AddMovie.vue'

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
      path: '/movie/:id',
      name: 'movie',
      component: Movie
    },
    {
      path: '/add',
      name: 'add',
      component: AddMovie,
      meta: {
        requiresAuth: true
      }      
    }         
  ]
})
