import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Vuelidate);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!store.state.userIsLogged) {
      next({ name: 'home' })
      store.state.snackbar = true;
      setTimeout(() => store.state.snackbar = false, 500)
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
