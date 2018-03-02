<template>
	<div class="recommend">
	<transition name="normal">
		<div ref="scrollerwrapper">
		<scroller ref="scroller" lock-x :scrollbar-y=false 
			:use-pulldown=true :height='scrolltop'
			@on-pulldown-loading='success' 
			@on-scroll-bottom='scrollbottom'
			:pulldownConfig="{ loadingContent: '<div></div>',upContent: '拉什么拉，快放手！',height:50,content: '下拉刷新',downContent: '下拉可刷新',}"
			@on-scroll='onscroll'>			
			<div class="index-content">				
				 <swiper loop auto :list="swiperdata" :index="index" @on-index-change="onIndexChange" @click.native="onClickPlay"></swiper>
				<div class="recommond-tit">
				 	<p>精彩推荐</p>
				</div>
				<listview :data="listdata"  @select="selectItem"></listview>
			</div>
		</scroller>
		</div>
	</transition>
	<div class="backtotop" @click="backtotop" v-show="showbtn">
		<span class="iconfont icon-jiantoushang"></span>
	</div>	
	<loading :show="loading" text="loading" ></loading>
	</div>
</template>
<script>
import Vue from 'vue'
import Listview from '@/common/listview/listview'
import { Swiper,Scroller,ToastPlugin,Loading} from 'vux'
Vue.use(ToastPlugin);
import axios from 'axios'
import {mapMutations,mapGetters} from "vuex"
export default {
	components:{
		Swiper,
		Scroller,
		Loading,
		Listview
	},
	data(){
		return {
			swiperdata:[],
			listdata:[],
			index: 0,
			scrolltop:'',
			successdata: true,
			showbtn:false,
			loading:false
		}
	},
	created(){					
		this._getSwiperList();
	},
	mounted(){
		this.initScroll();
	},
	methods:{
		initScroll(){
			let scrolltop=this.$refs.scrollerwrapper.offsetTop;
			this.scrolltop=(document.documentElement.clientHeight-scrolltop)+'px';
			console.log(this.scrolltop);
		},
		//下拉刷新重新获取数据
		success(){
			setTimeout(()=>{
				this.swiperdata=[];
				this.listdata=[];
				this._getSwiperList();
				this.$refs.scroller.reset({top:0})
			},2000)
		},
		scrollbottom(){
			this.$vux.toast.text('做人要有底线~~', 'bottom');
		},
		onscroll(position){
			if(position!=null){
				if(position.top>200){
					this.showbtn=true;
				}else{
					this.showbtn=false
				}
			}			
		},
		onIndexChange (index) {
		    this.index = index;
		},
		onClickPlay(){
			let plid=this.swiperdata[this.index].plid;
			let contentid=this.swiperdata[this.index].contentid;
			this.goPlayDetail(plid,contentid);
		},
		goPlayDetail(plid,contentid){
			this.$router.push({ path: '/playDetail', query: { plid: plid,contentid:contentid}})
		},
		selectItem(plid,contentid){
			this.goPlayDetail(plid,contentid);
		},
		_getSwiperList(){
			this.loading=true;
		   	axios.get('/api/getList',{}).then((res)=>{
				//数据处理成后5条做轮播图
				this._dataprocessing(res.data);
				this.loading=false;
			})
		},
		backtotop(){
			this.$refs.scroller.reset({top:0})
		},
		_dataprocessing(list){
			for(var i=0;i<5;i++){
				let swiperobj={};
				swiperobj.plid=list[i].plid;
	  			swiperobj.contentid=list[i].subscribeContentId;
	   			swiperobj.img=list[i].image;
		   		swiperobj.title=list[i].contentTitle;
				this.swiperdata.push(swiperobj);
			}
		   	for(var j=5;j<list.length;j++){
				let listviewobj={};
	   			listviewobj.plid=list[j].plid;
	   			listviewobj.contentid=list[j].subscribeContentId;
		   		listviewobj.image=list[j].image;
				listviewobj.contentTitle=list[j].contentTitle;
				listviewobj.contentDesc=list[j].contentDesc;		   					
				listviewobj.publishTime=timeprocessing(list[j].publishTime);
	   			listviewobj.viewCount=viewcountprocessing(list[j].viewCount);
		   		listviewobj.quantity=list[j].quantity;
		   		this.listdata.push(listviewobj);		   			
			}		 
		   	function timeprocessing(num){
		   		let date=new Date(num);
		   		let str="";
		   		let year = date.getFullYear();
		   		let month= date.getMonth();
		   		let day = date.getDate();
		   		str=year+'/'+month+"/"+day
		   		return str
		   	}
			function viewcountprocessing(count){
		   		let str;
				if(count>10000){
		   			str=parseInt(count/10000)+'.'+parseInt(count%10000/1000)+'万';
		   		}else{
		   			str=count;
		  		}
				return str
			}
		},
	}
}
</script>
<style lang="scss" scoped>
.recommond-tit {
  text-align: center;
  padding-top: 1rem;
  p {
    font-size: 1.2rem;
    color: #333333;
	text-shadow:#f3f3f3 1px 1px 0px, #b2b2b2 1px 2px 0
  }
}
.backtotop {
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  text-align: center;
  background: rgba(0,0,0,.4);
  border-radius: 50%;  
  span {
	  	color: #fff;
		font-size: 2rem;
		line-height: 3rem; 
  }
}
</style>
