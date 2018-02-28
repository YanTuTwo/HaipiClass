import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from "fastclick"
import store from "./store"
import VueLazyLoad from "vue-lazyload"
Vue.config.productionTip = false
import "babel-polyfill"

fastclick.attach(document.body);//解决300毫秒延迟问题

Vue.use(VueLazyLoad,{
	loading:require('@/assets/image/lazyloading.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
