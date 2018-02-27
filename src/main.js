import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from "fastclick"
import store from "./store"
Vue.config.productionTip = false

fastclick.attach(document.body);//解决300毫秒延迟问题
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
