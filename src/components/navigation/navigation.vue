<template>
	<div class="tab-wrapper">
	<scroller lock-y :scrollbar-x=false ref="scroller">
		<div class="tab">
			<tab :line-width=2 v-model="index" defaultColor='#666' active-color='dodgerblue'>	      	        
	        	<tab-item class="vux-center" :selected="currentname === item.name" v-for="(item, index) in navlist"  @on-item-click="onItemClick" :key="index"  ref="tab_item" >
	        		<router-link class="tab-item" :to="item.router">{{item.name}}</router-link>
	        	</tab-item>	        	
	      </tab>
		</div>		
	</scroller>
	</div>
</template>

<script>
	import { Scroller,Tab,TabItem } from 'vux'
	import {mapGetters} from "vuex"
	import {mapMutations} from "vuex"
	export default {
		data(){
			return {
				navlist:[
					{
						name:'推荐',
						router:'/index/recommend'					
					},{
						name:'TED',
						router:'/index/ted'					
					},{
						name:'国外名校',
						router:'/index/internationalschool'					
					},{
						name:'国内名校',
						router:'/index/domesticschool'					
					},{
						name:'演讲',
						router:'/index/speech'					
					},{
						name:'趣味分享',
						router:'/index/funshare'					
					}
				],
				index: 0,
				currentname:'推荐',
			}
		},
		mounted(){
			//根据路由地址判断当前的tabitem是哪个
			for(var i=0;i<this.navlist.length;i++){
				if(this.navlist[i].router==this.$route.fullPath){
					this.currentname=this.navlist[i].name;
					this.onItemClick(i);
				}
			}
		},
		computed:{
			...mapGetters(['navindex'])
		},
		components:{
			Scroller,
			Tab,
			TabItem
		},
		methods:{
			onItemClick(index){
				console.log(index);
				this.SET_NAVINDEX(index);
				let obj=document.querySelectorAll('.vux-tab-item');
				// console.log(obj.length);
				if(index>0&&index<obj.length-2){
					let left=(index-1)*obj[index].offsetWidth;
					// console.log(left);
					this.$nextTick(() => {
				      	this.$refs.scroller.reset({left: left})
				   })
				}
				if(index==obj.length-2 || index==obj.length-1){
					let left=2*obj[index].offsetWidth;
					// console.log(left);
					this.$nextTick(() => {
				      	this.$refs.scroller.reset({left: left})
				    })
				}				
			},
			...mapMutations([
				'SET_NAVINDEX'
			])
		}

	}
</script>

<style>
	.tab{
		width:150%;		
	}
	.tab-item{
		display: block;
		text-decoration: none;
		color: #333;		
		width: 100%;
		height: 100%;
	}
	.vux-tab{
		height: 3rem !important;
	}
	.vux-tab .vux-tab-item.vux-tab-selected a{
		color: dodgerblue;
	}
</style>