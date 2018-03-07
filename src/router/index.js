import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Recommend from "@/components/recommend/recommend"
import Ted from "@/components/ted/ted"
import Speech from "@/components/speech/speech"
import PlayDetail from "@/components/playDetail/playDetail"
import Internationalschool from "@/components/internationalschool/internationalschool"
import Domesticschool from "@/components/domesticschool/domesticschool"
import Funshare from "@/components/funshare/funshare"
import Login from "@/components/login/login"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/index/recommend"
    },
    {
      path:'/index/recommend',
      name:'index',
      component: Index,
      children:[
        { path: '/index/recommend', component:Recommend},
        { path: '/index/ted', component:Ted},
        { path: '/index/speech', component: Speech},
        { path: '/index/internationalschool' ,component : Internationalschool},
        { path: '/index/domesticschool' ,component : Domesticschool},
        { path: '/index/funshare' ,component : Funshare}
      ]
    },
    {
      path:'/playDetail',
      name:'playDetail',
      component:PlayDetail
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})
