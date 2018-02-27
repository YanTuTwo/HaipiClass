<template>
	<div class="index">
		<x-header>
			<span slot="overwrite-left">
				<x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px" @click="showUser"></x-icon>				
			</span>
			<div class="logo"><img src="../../assets/logo.png" alt=""></div>
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
</style>



