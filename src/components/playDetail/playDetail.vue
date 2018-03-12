<template>
    <div class="playDetail">
        <x-header :left-options="{backText: ''}">嗨皮课堂</x-header>
        <scroller lock-x :scrollbar-y=false height="-46" ref='scroller' use-pullup @on-pullup-loading="pullup" @on-scroll='onscroll'
		:pullupConfig="{ loadingContent: '<load-more></load-more>',upContent: '加载中...',height:50,content: '上拉加载更多',downContent: '释放加载更多',}">
			<div class="scrollerwrapper">
				<div class="videowrapper">
					<video width="100%" controls="true" :src="videolist.mp4HdUrl || videolist.mp4SdUrl" :poster="videolist.imgPath" ref='video' ></video>
				</div>
				<p class="viewcount">播放：{{moviedata.hits | ConvertPeople}}次
					<span class="iconfont icon-fenxiang text-nor"></span>
					<span @click="onCollect" ref="collectbtn" :class="{collectedbtn: collected}" class="iconfont icon-star-copy"></span>					
				</p>
				<div class="movieinfo">
					<p class="movietit">{{moviedata.tit}}</p>
					<p class="movie-con" v-if="isVideoCollection"><span>本节课程：</span>{{videolist.title}}</p>
					<p class="movie-con"><span>讲师：</span>{{moviedata.director}}</p>
					<p class="movie-con"><span>标签：</span>{{moviedata.tags}}</p>
					<p class="movie-con"><span>类型：</span>{{moviedata.type}}</p>
					<p class="movie-con moviedescription"><span>课程简介：</span>{{moviedata.description}}</p>
				</div>
				<h3 class="hotcomments-tit">{{isVideoCollection?'课程目录':'网易热门评论'}}</h3>
				<div class="hotcomments" v-if="!isVideoCollection">							
					<ul>
						<li v-for="item in hotlist">
							<div class="user">{{item.siteName+item.location}}网友  {{item.nickname}}<span>{{item.createTime}}</span></div>
							<p class="comments-con" v-html="item.content"></p>
						</li>
						<li v-if="isEmptyhotlist">
							<load-more :show-loading="false" :tip="('暂无评论')" background-color="#fbf9fe"></load-more>
						</li>
					</ul>
					<div class="morebtn" @click="lookmore" v-show="hotlistflag=='three'&&!isEmptyhotlist&&hotlist.length==3"><span class="iconfont icon-jiantouxia"></span></div>
				</div>
				<div class="videoBox" v-if="isVideoCollection">
					<div v-for="(item,index) in currentVideoList">
						<div class="CollectionItem" @click="selectItem(item.plid,item.mid)" :class="{'active':currentVideoIndex==index}">第{{item.pNumber}}集{{item.title}}</div>
					</div>
					<x-button  @click.native="onLookAll" plain type="primary" class="custom-primary-blue" v-if="VideoCollection.length>3">查看全部课程</x-button>	
				</div>
				<h3 class="aboutrecommend">相关推荐</h3>
				<listview :data="recommendList"  @select="selectItem"></listview>
			</div>		
		</scroller> 
		<popup v-model="showHideOnBlur" position="bottom" max-height="70%">	
			<div class="popup-wrap">
				<checker v-model="VideoIndex" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
					<checker-item :value="index" v-for="(item,index) in VideoCollection" on-change="">
						<div class="CollectionItem" @click="selectItem(item.plid,item.mid)">第{{index+1}}集{{item.title}}</div>
					</checker-item>
				</checker>
			</div>				
			<div style="padding: 15px;">
				<x-button @click.native="showHideOnBlur = false" plain type="primary"  class="custom-primary-blue"> Close Me </x-button>
			</div>
		</popup> 
		<div class="backtotop" @click="backtotop" v-show="showbtn">
			<span class="iconfont icon-jiantoushang"></span>
		</div>
		<div class="goIndexPage" @click="goIndexPage">
			<span class="iconfont icon-msnui-home"></span>
		</div>
		<loading :show="loading" text="loading" ></loading>      
    </div>
</template>
<script>
import Vue from 'vue'
import { XHeader,Scroller,Loading,Actionsheet,ToastPlugin,LoadMore,Checker,CheckerItem,XButton,Popup} from 'vux'
Vue.use(ToastPlugin);
import {mapGetters,mapMutations} from "vuex"
import listview from '@/common//listview/listview'
import axios from 'axios'
export default {
    data(){
        return {
            moviedata:[],
			recommendList:[],
			hotlist:[],
			videolist:[],
			loading:false,
			hotlistflag:'three',
			recommenstart:0,
			recommenlen:5,
			collected:true,
			showbtn:false,
			isEmptyhotlist:false,
			isVideoCollection:false,//是否为合集
			VideoCollection:[],//合集
			currentVideoList:[],//当前集数的前后两级
			currentVideoIndex:0,
			VideoIndex:0,//当前集数
			showHideOnBlur:false,
        }
    },
    components:{
        XHeader,
		Scroller,
		Loading,
		listview,
		Actionsheet,
		LoadMore,
		Checker,
		CheckerItem,
		XButton,
		Popup
    },
    mounted(){
        console.log(this.$route.query);
		this.initDetail();
    },
    methods:{
		//初始化数据，获取路由传来的参数
		initDetail(){
			this.loading=true;
			this.plid=this.$route.query.plid;
			this.contentid=this.$route.query.contentid;
			this._getmoviedata();				
		},
		//获取当前id的视频信息
        _getmoviedata(){
			axios.get('/api/playDetail/getMovieList?plid='+this.plid+'&start='+this.recommenstart+'&len='+this.recommenlen).then((res)=>{
				console.log(res.data);
				this.moviedata=res.data;
				this.recommendList=	res.data.recommendList;				
				//判断是否为合集
				if(res.data.videoList.length>1){
					this.isVideoCollection=true;
					this.VideoCollection=res.data.videoList;
					for(var i=0;i<this.VideoCollection.length;i++){
						if(this.plid==this.VideoCollection[i].plid && this.contentid==this.VideoCollection[i].mid){
							this.VideoIndex=i;
							this.videolist=this.VideoCollection[i];
							this.lastnextVideo(this.VideoCollection,this.VideoIndex);
							this.loading=false;
							return false;
						}
					}					
				}else{
					this.isVideoCollection=false;
					this.videolist=res.data.videoList[0];
					this._gethotlist();
					this.loading=false;
				}				
			})
        },
		_getmorerecList(){
			axios.get('/api/playDetail/getMoreList?plid='+this.plid+'&start='+this.recommenstart+'&len='+this.recommenlen).then((res)=>{
				console.log(res.data);
				if(res.data==""){
					this.$vux.toast.text('没有更多数据了~·', 'bottom');
					this.$refs.scroller.reset();
					this.$refs.scroller.disablePullup();
					this.loading=false;
					return false;
				}
				this.recommendList=	this.recommendList.concat(res.data);		
				this.loading=false;
				this.$refs.scroller.reset();
				this.$refs.scroller.donePullup();
			})
		},
        _gethotlist(){
			axios.get('/api/playDetail/getcomments?contentid='+this.contentid+'&flag='+this.hotlistflag).then((res)=>{
		   		if(this.hotlistfla=='all'){
		   			this.hotlist=res.data;
		   		}
				this.hotlist=this.hotlist.concat(res.data);
				if(this.hotlist==""){
					this.isEmptyhotlist=true;
				}else{
					this.isEmptyhotlist=false;
				}
			})
        },
        pullup(){
			this.recommenstart=this.recommenlen+this.recommenstart;
			this.loading=true;
		    this._getmorerecList();			    
        },
		onCollect(){
			
		},
		lookmore(){
			this.hotlistflag='all';
			this._gethotlist();
			this.$nextTick(() => {
				this.$refs.scroller.reset();
			})
		},
		selectItem(plid,contentid){
			this.showHideOnBlur=false;
			this.$router.push({ path: '/playDetail', query: { plid: plid,contentid:contentid}});
		},
		backtotop(){
			this.$refs.scroller.reset({top:0});
		},
		goIndexPage(){
			this.$router.push({ path: '/index/recommend'});
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
		onLookAll(){
			// console.log("1");
			this.showHideOnBlur=true;
		},
		lastnextVideo(arr,currentindex){
			if(arr.length<=3){
				this.currentVideoList=arr;
				return false;
			}else{				
				if(arr.length-1==currentindex){
					this.currentVideoList=arr.slice(currentindex-2,currentindex+1);
					this.currentVideoIndex=2;
					return false;
				}
				if(currentindex==0){
					this.currentVideoList=arr.slice(currentindex,currentindex+3);
					this.currentVideoIndex=0;
					return false;
				}
				this.currentVideoList=arr.slice(currentindex-1,currentindex+2);
				this.currentVideoIndex=1;
			}			
		}
    },
	watch: {
		'$route' (to, from) {
		this.hotlistflag="three";
		this.hotlist=[];
		this.initDetail();				
		this.$refs.scroller.reset({top:0})
    }
}
}
</script>
<style lang="scss" scoped>
	.playDetail{
		background: #fff;
	}
	video{
		// width: 100%;
		display: block;
		// height: 14rem;
	}
	.viewcount{
		width: 100%;
		background: #eee;
		color: #9b9b9b;
		font-size: 0.8rem;
		float: left;
		line-height: 2rem;
		height: 2rem;
		padding: 0 0.8rem;
	}
	.movieinfo{
		/*width: 100%;*/
		padding: 1rem;
		margin-top: 2rem;
		font-size: 0.8rem;
		line-height: 1.2rem;
	}
	.movie-con{
		color: #666;
		line-height: 1.2rem;
	}
	.movie-con span{
		color: #999;
	}
	.movietit{
		color: #333333;
		font-size: 1.1rem;
		text-align: left;
		line-height: 2rem;
		margin: 0.6rem 0;
		
	}
	.moviedescription{
		margin-top: 1rem;
	}
	.hotcomments-tit{
		font-size: 1.1rem;
		color: #333333;
		text-align: center;
		line-height: 3rem;
		margin-top: 1rem;
		border-top: 0.06rem solid #BABABA;
		font-weight: normal;
		text-shadow:#f3f3f3 1px 1px 0px, #b2b2b2 1px 2px 0
	}  
	.hotcomments{
		padding: 0 0.8rem;
	}
	.morebtn{
		background: #fff;
		text-align: center;
		height: 3rem;
		span {
			line-height: 3rem;
			color: #999;
			font-size: 2rem;
		}
	}
	.user{
		// width: 60%;
		padding-right: 40%;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #1991EC;
		font-size: 0.8rem;
		margin-top: .3rem;
	}
	.user span{
		position: absolute;
		top: 0;
		right: 0;
		color: #BABABA;
	}
	.comments-con{
		color: #333;
		padding: 1rem 0;
		border-bottom: 0.06rem solid #f2f2f2;
		font-size: 0.8rem;
	}
	.aboutrecommend{
		text-align: center;
		border-top: 0.06rem solid #BABABA;
		line-height: 3rem;
		margin-top: 1rem;
		color: #333333;
	}
	.viewcount span{
		color: #ccc;
		float: right;
		margin-left: 1rem;
		font-size: 1.4rem;
		line-height: 2rem;
		.collectedbtn{
			color: #F74342;
		}
	}
	
	.backtotop {
		position: fixed;
		bottom: 6rem;
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
	.goIndexPage {
		position: fixed;
		bottom: 2rem;
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
	.videoBox{
		padding: 0 2rem;
		
		.CollectionItem{
			width: 100%;
			height: 3rem;
			border: 1px solid #ccc;
			display: inline-block;
			border-radius: 5px;
			line-height: 3rem;
			text-align: center;
			margin: 5px 0; 
		}
		.active{
			border-color: #1991EC;
			background: #1991EC;
			color: white;
		}
	}
	.popup-wrap{
		padding: 1rem;
		height: 25rem;
		overflow-y: auto;
		.demo2-item {
			width: 100%;
			height: 3rem;
			border: 1px solid #ccc;
			display: inline-block;
			border-radius: 5px;
			line-height: 3rem;
			text-align: center;
			margin: 5px 0; 
		}
		.demo2-item-selected {
			border-color: #1991EC;
			background: #1991EC;
			color: white;
		}
	}
	.custom-primary-blue {
		border-radius: 99px!important;
		border-color: #1991EC!important;
		color: #1991EC!important;
		&:active {
			border-color:#1991EC!important;
			color: #fff!important;
			background-color: #1991EC !important;
		}
	}
	
</style>

