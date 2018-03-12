<template>
  <div id="app" style="height: 100%">
    <drawer :show.sync="showUserMode" :show-mode="showModeValue" :drawer-style="{'background-color':'#fff', width: '17rem'}">
		<div slot="drawer">
			<userCenter @showUserModal="showUser"></userCenter>			
		</div>
		<div slot="default">
			<transition appear :name='transitionName'>
				<router-view @showUserModal="showUser"></router-view>
			</transition>
		</div>      
    </drawer>  
  </div>
</template>

<script>
import {Popup, Drawer } from "vux";
import {mapMutations} from "vuex";
import UserCenter from "@/components/userCenter/userCenter"
export default {
	name: "App",
	components: {
    	Popup,
			Drawer,
			UserCenter
  	},
  	data() {
    	return {
				showUserMode:false,
				showModeValue: "push",
				transitionName: 'slide-left' 
    	};
	},
	mounted(){
		this.checkLogin();
	},
	computed:{

	},
	methods:{
		showUser(){
			this.showUserMode=!this.showUserMode;
		},
		checkLogin(){
			if(window.localStorage.getItem('userid') && window.localStorage.getItem('password')){
				this.SET_LOGINSTATUS(true);
			}
		},
		...mapMutations([
			'SET_LOGINSTATUS'
		])
	},
	watch:{
		
	}
};
</script>

<style>
@import "./assets/styles/common.css";
@import url("//at.alicdn.com/t/font_487716_pbmcpc8uuta3v7vi.css");
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
    background: url("./assets/image/pulldownloading.gif") no-repeat;
    background-size: 40px 30px;
}
.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc{
	height: auto !important;
}
.recommend .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
  background-position: top center;
}
.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
</style>
