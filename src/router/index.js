import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Recommend from "@/components/recommend/recommend"
import Ted from "@/components/ted/ted"
import Internationalschool from "@/components/internationalschool/internationalschool"
import PlayDetail from "@/components/playDetail/playDetail"
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
        { path: '/index/internationalschool', component: Internationalschool}
      ]
    },
    {
      path:'/playDetail',
      name:'playDetail',
      component:PlayDetail
    }
  ]
})
