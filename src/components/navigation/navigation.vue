<template>
	<div class="tab-wrapper">
	<scroller lock-y :scrollbar-x=false ref="scroller">
		<div class="tab">
			<tab :line-width=2 v-model="index" defaultColor='#666' active-color='dodgerblue'>	      	        
	        	<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in navlist" @click="demo2 = item" :key='index' @on-item-click="onItemClick"  ref="tab_item" >
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
						name:'国际名校',
						router:'/index/internationalschool'					
					},{
						name:'国内名校',
						router:'/index/domesticschool'					
					},{
						name:'演讲',
						router:'/index/speech'					
					},{
						name:'趣味课堂',
						router:'/index/funclass'					
					}
				],
				index: 0,
				demo2: '推荐'
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
			onItemClick(){
				this.SET_NAVINDEX(this.index);
				console.log(typeof this.navindex);
				let obj=document.querySelectorAll('.vux-tab-item');
				if(this.index>0&&this.index<obj.length-2){
					let left=(this.index-1)*obj[this.index].offsetWidth;
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