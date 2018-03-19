<template>
  <div id="app" style="height: 100%">
    <drawer :show.sync="showUserMode" :show-mode="showModeValue" :drawer-style="{'background-color':'#fff', width: '17rem'}">
		<div slot="drawer">
			<userCenter @showUserModal="showUser" :userBaseInfo='userBaseInfo'></userCenter>			
		</div>
		<div slot="default">
			<transition appear :name='transitionName'>
				<router-view @showUserModal="showUser" :userBaseInfo='userBaseInfo'></router-view>
			</transition>
		</div>      
    </drawer>  
  </div>
</template>

<script>
import {Popup, Drawer } from "vux";
import {mapMutations,mapGetters} from "vuex";
import UserCenter from "@/components/userCenter/userCenter"
import axios from "axios"
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
				transitionName: 'slide-left',
				userBaseInfo:{},
    	};
	},
	mounted(){
		this.checkLogin();
	},
	computed:{
		...mapGetters([
				"loginstatus"
			])
	},
	methods:{
		showUser(){
			this.showUserMode=!this.showUserMode;
		},
		checkLogin(){
			if(window.localStorage.getItem('userid') && window.localStorage.getItem('password')){
				this.SET_LOGINSTATUS(true);
			}else{
				// this.userBaseInfo.avatar="http://39.108.233.223:9999/images/avatarimg/touxiang.jpeg"
			}
		},
		getUserInfo(){
			axios.get("/api/users/getuserinfo",{
				params:{
					userid:window.localStorage.getItem("userid"),
				},
			}).then((res)=>{
				if(res.data.code){
					this.userBaseInfo=res.data.data;
				}				
			})
		},
		...mapMutations([
			'SET_LOGINSTATUS',
		])
	},
	watch:{
		loginstatus(){
			console.log("dengluzhuangtai:"+this.loginstatus);
			if(this.loginstatus){
				this.getUserInfo();
			}else{
				this.userBaseInfo={};
			}
		}
	}
};
</script>

<style>
@import "./assets/styles/common.css";
@import url("http://at.alicdn.com/t/font_487716_pz7cs2s2zhsbrzfr.css");
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
