import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from "fastclick"
import store from "./store"
import VueLazyLoad from "vue-lazyload"
Vue.config.productionTip = false
import "babel-polyfill"
import axios from "axios"

axios.defaults.withCredentials = true; 
fastclick.attach(document.body);//解决300毫秒延迟问题

Vue.use(VueLazyLoad,{
	loading:require('@/assets/image/lazyloading.gif')
})


//将毫秒数转换成年月日
Vue.filter('ConvertTime', function (value) {
  if (!value) return ''
  let date=new Date(value);
	let str="";
	let year = date.getFullYear();
	let month= date.getMonth();
	let day = date.getDate();
	str=year+'/'+month+"/"+day;
	return str
})
//将数量转换成万字结尾
Vue.filter('ConvertPeople', function (value) {
  if (!value) return ''
  let str;
	if(value>10000){
		str=parseInt(value/10000)+'.'+parseInt(value%10000/1000)+'万';
	}else{
		str=count;
	}
  return str
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
