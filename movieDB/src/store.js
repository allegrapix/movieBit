import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:4000',
    sliderImages: [
      {
        imgSrc: require('@/assets/image-1.jpg')
      },
      {
        imgSrc: require('@/assets/image-2.jpg')
      },
      {
        imgSrc: require('@/assets/image-3.jpg')
      }            
    ],
    currentPage: 1,
    modalIsOpen: false,
    pressLogin: false,
    pressLogout: false,
    pressRegister: false, 
    userIsLogged: false,
    token: '',
    snackbar: false, 
    currentUser: '',
    snackbarLogin: false,
    addEdit: '',
    movieId: ''
  },
  mutations: {

  },
  actions: {

  }
})
