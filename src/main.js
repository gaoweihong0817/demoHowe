import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import axios from './http/http'
Vue.prototype.$axios = axios
// axios.defaults.withCredentials = true

// //面包屑
router.beforeEach((to, from, next) => {
  // console.log(to.meta.break)
  store.commit('Break', to.meta.break)
  next()
})

//富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

Vue.config.productionTip = false





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')