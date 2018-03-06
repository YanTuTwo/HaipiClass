<template>
  <div id="app" style="height: 100%">
    <drawer :show.sync="showUserMode" :show-mode="showModeValue" :drawer-style="{'background-color':'#fff', width: '17rem'}">
		<div slot="drawer">
			<userCenter></userCenter>			
		</div>
		<div slot="default">
			<router-view @showUserModal="showUser"></router-view>
		</div>      
    </drawer>  
  </div>
</template>

<script>
import {Popup, Drawer } from "vux";
import {mapMutations} from "vuex"
import MHeader from "@/components/m-header/m-header"
import UserCenter from "@/components/userCenter/userCenter"
export default {
	name: "App",
	components: {
			MHeader,
    	Popup,
			Drawer,
			UserCenter
  	},
  	data() {
    	return {
			showUserMode:false,
      		showModeValue: "push"
    	};
	},
	computed:{

	},
	methods:{
		showUser(){
			this.showUserMode=!this.showUserMode;
		},
		...mapMutations([
			'SET_SHOWUSER'
		])
	},
	watch:{
		
	}
};
</script>

<style>
@import "./assets/styles/common.css";
@import url("//at.alicdn.com/t/font_487716_2rqjdqlgd4zk6gvi.css");
body {
  	background-color: #fbf9fe;
}
html,body {
  	height: 100%;
  	width: 100%;
 		overflow-x: hidden;
}
.xs-plugin-pulldown-container{
  color: #fff;
  background: #1991ec;
}
.xs-plugin-pullup-container {
	color: #999;
  background: #fff;
	line-height: 50px;
}
.xs-plugin-pulldown-container>div{
		width: 40px;
    height: 30px;		
    margin: 10px auto;
    background: url("http://yantutu.xin:8080/static/img/pulldownloading.a61850f.gif") no-repeat;
    background-size: 40px 30px;
}
.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc{
	height: auto !important;
}
.recommend .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
  background-position: top center;
}
</style>
