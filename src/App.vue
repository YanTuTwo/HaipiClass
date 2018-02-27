<template>
  <div id="app" style="height: 100%">
    <drawer :show.sync="showUserMode" :show-mode="showModeValue" :drawer-style="{'background-color':'#fff', width: '200px'}">
		<div slot="drawer">个人中心</div>
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
export default {
	name: "App",
	components: {
		MHeader,
    	Popup,
   		Drawer
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

<style lang="less">
// @import '~vux/src/styles/reset.less';
@import "./assets/styles/common.css";
body {
  	background-color: #fbf9fe;
}
html,body {
  	height: 100%;
  	width: 100%;
 	overflow-x: hidden;
}
</style>
