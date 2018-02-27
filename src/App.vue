<template>
  <div id="app" style="height: 100%">
    <drawer :show.sync="showUserMode" :show-mode="showModeValue" :drawer-style="{'background-color':'#fff', width: '200px'}">
		<div slot="drawer">hahahah</div>
		<div slot="default">
			<m-header @showUser="showUser"></m-header>
			<router-view></router-view>
		</div>      
    </drawer>  
  </div>
</template>

<script>
import {Popup, Drawer } from "vux";
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
   			showUserMode: false,
      		showModeValue: "push"
    	};
  	},
	methods:{
		showUser(){
			this.showUserMode=!this.showUserMode;
		}
	}
};
</script>

<style>
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
