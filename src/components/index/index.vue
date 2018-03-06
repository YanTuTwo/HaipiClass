<template>
	<div class="index">
		<x-header :left-options="{showBack: false}">
			<div class="avatar" @click="showUser">
				<!-- <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px" @click="showUser"></x-icon> -->
				<img src="../../assets/image/touxiang.jpeg" alt="">	
			</div>
			<div class="logo"><img src="../../assets/image/logo.png" alt=""></div>
		</x-header>
		<navigation></navigation>
		<router-view></router-view>
	</div>
</template>
<script>
import {XHeader,Scroller,Tab,TabItem} from "vux"
import MHeader from "@/components/m-header/m-header"
import Navigation from "@/components/navigation/navigation"
export default {
	data(){
		return {
		}
	},
	components:{
		MHeader,
		XHeader,
		Navigation
	},
	methods:{
		showUser(){
			this.$emit("showUserModal")
		},
	}
}
</script>
<style lang="scss" scoped>
	.logo{
		width: 100%;
		height: 40px;
		position: relative;
		text-align: center;vertical-align: middle;
		img{
			width: 60%;
			transform:translate(-50%, -50%);
			position: absolute;
			top: 50%;
			left: 50%;
		}
	}
	.avatar{
		position: absolute;
		top: 8px;
		left: 12px;
		width: 32px;
		height: 32px;
		overflow: hidden;
		border-radius: 50%;
		border: 2px solid #fff;
		img{
			width: 100%;
			height: 100%;
		}
	}
</style>



