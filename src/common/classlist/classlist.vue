<template>
	<div class="classlit">
		<section v-for="(item,index) in data" class="category_item" @click="selectItem(index)">
			<div class="category_img">
				<img :src="item.picUrl" alt="" />
			</div>
			<div class="category_info">
				<div class="category_title"><span>{{item.title}}</span></div>
				<div class="category_desc">
					<span class="category_length">{{item.quantity}} | </span>
					<span class="category_playtimes">{{item.viewcount}}人观看</span>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		props:{
			data:{
				type:Array,
				default:null
			}
		},
		methods:{
			selectItem(index){
				let plid=this.data[index].plid;
				let rid=this.data[index].rid;
				this.$emit('select',plid,rid);
			}
		}
	}
</script>

<style>
	.category_item{
		width: 100%;
    	height: 6.6rem;
    	background: #f8f8f8;
    	border-bottom: 1px solid #eee;
    	padding: 1rem .8rem;
    	-webkit-box-sizing: border-box;
    	box-sizing: border-box;
	}
	.category_img{
		float: left;
		width: 6.4rem;
		height: 4.5rem;
		margin-right: 0.8rem;
	}
	.category_img img{
		width: 100%;
		height: 100%;
	}
	.category_info{
		overflow: hidden;
	}
	.category_title{
		margin-bottom: 0.3rem;
	}
	.category_desc{
		font-size: .6rem;
   		color: gray;  		
	}
</style>