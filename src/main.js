// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import  'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
// import store from './store'

// Vue.use(VueLazyload, {
//   loading: require('./common/image/default.png')
// })
Vue.config.productionTip = false
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
