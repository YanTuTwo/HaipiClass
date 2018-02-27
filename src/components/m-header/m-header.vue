<template>
	<x-header>
		<span slot="overwrite-left">
			<x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px" @click="showUser"></x-icon>				
		</span>
		<div class="logo"><img src="../../assets/logo.png" alt=""></div>
	</x-header>
</template>
<script>
import {XHeader} from "vux"
export default {
	components:{
		XHeader
	},
	methods:{
		showUser(){
			this.$emit('showUser');
		}
	}
}
</script>
<style lang="scss">
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
