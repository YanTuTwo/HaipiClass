<template>
    <div class="playDetail">
        <x-header :left-options="{backText: ''}">嗨皮课堂</x-header>
		<div class="videowrapper">
			<video width="100%" controls="true" :src="videodata.videoUrl" ref='video' @play="startplay" :poster="videodata.videoimg"></video>
		</div>
		<div class="scrollwrap"  ref='videodetail'>
			<scroller lock-x :scrollbar-y=false :height="scrolltop" ref='scroller' use-pullup @on-pullup-loading="pullup" @on-scroll='onscroll'
			:pullupConfig="{ loadingContent: '<div></div>',upContent: '加载中...',height:50,content: '上拉加载更多',downContent: '释放加载更多',}">
				<div class="scrollerwrapper">				
					<div class="movieinfo">
						<div class="author">
							<img :src="userInfo.avatar" alt=""><span>{{userInfo.nickname}}</span>
						</div>
						<p class="movietit">{{videodata.tit}}</p>
						<p class="uptime text-grey">上传时间：{{videodata.uptime | ConvertTime}}</p>
						<p class="movie-con moviedescription"><span>视频简介：</span>{{videodata.desc}}</p>
					</div>
					<div class="action">
						<div @click="onVote" :class="{active : isVote}"><span class="iconfont icon-dianzan ft-24" ></span><p>{{videodata.vote}}</p>  </div>
						<div @click="onColl" :class="{active : isColl}"><span class="iconfont icon-shoucangjia1 ft-24"></span><p>{{videodata.coll}}</p>  </div>
						<div @click="goComment"><span class="iconfont icon-pinglun ft-24"></span><p>{{commentNum}}</p>  </div>
					</div>
					<h3 class="hotcomments-tit">热门评论</h3>
					<div class="hotcomments">							
						<ul>
							<li v-for="item in commentlist">
								<div class="user">用户{{item.actionid}}<span>{{item.time | ConvertTime}}</span></div>
								<p class="comments-con" v-html="item.content"></p>
							</li>
							<li v-if="isEmptycommentlist">
								<load-more :show-loading="false" :tip="('暂无评论')" background-color="#fbf9fe"></load-more>
							</li>
						</ul>
					</div>
					<h3 class="aboutrecommend">精彩推荐</h3>
					<div class="recommend-list">
						<section v-for="(item,index) in recommendList" @click="selectItem(item)">			 
							<div class="article_img">
								<img v-lazy="item.videoimg"/>
								<div class="article_length">
								<span class="article_length_value">{{item.quantity}}</span></div>
							</div>
							<div class="article_info">
								<div class="article_time">{{item.uptime | ConvertTime}}</div>
								<div class="article_title">{{item.tit}}</div>
								<div class="article_desc">{{item.desc}}</div>
								<div class="article_bottom">
									<p>{{item.coll | ConvertPeople}}人收藏 ，{{item.vote | ConvertPeople}}人点赞</p>
									<!-- <span class="share"></span>、 -->
								</div>
							</div>
							
						</section>
					</div>
				</div>		
			</scroller> 
		</div>
        
		<div class="backtotop" @click="backtotop" v-show="showbtn">
			<span class="iconfont icon-jiantoushang"></span>
		</div>
		<div class="comment" ref="comment" v-if="loginstatus">
			<input type="text" v-model="commentCentent" placeholder="评论点什么吧！"><span @click="sendcomment">发送</span>			
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
			userBaseInfo:{},//当前用户的信息
			scrolltop:'',
			videodata:{},
			userInfo:{},
			recommendList:[],
			videolist:[],
			loading:false,
			showbtn:false,
			commentNum:0,
			commentlist:[],
			isEmptycommentlist:false,
			commentCentent:'',
			isColl:false,
			isVote:false,
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
	computed:{
		...mapGetters([
			'loginstatus',
		])
	},
	created(){
		
	},
    mounted(){
        console.log(this.$route.query);
		this.initDetail();
		this.initScroll();
    },
    methods:{
		//初始化滚动
		initScroll(){
			let scrolltop = this.$refs.videodetail.offsetTop;
			let commentwrap
			if(this.loginstatus){
				commentwrap= this.$refs.comment.offsetHeight;
			}else{
				commentwrap= 0;
			}
			
			this.scrolltop = (document.documentElement.clientHeight - scrolltop-commentwrap) + 'px';
			console.log(scrolltop)
        },
		//判断是否收藏
		isCollected(){
			let hpcollect=this.userBaseInfo.hpCollect;
			for(var i=0;i<hpcollect.length;i++){
				if(hpcollect[i].videoid==this.videoid){
					this.isColl=true;
				}
			}
		},
		//判断是否点赞
		isVoted(){
			let votehistory=this.userBaseInfo.voteHistory;
			for(var i=0;i<votehistory.length;i++){
				if(votehistory[i].videoid==this.videoid){
					this.isVote=true;
				}
			}
				
		},
		//初始化数据，获取路由传来的参数
		initDetail(){
			this.loading=true;
			this.videoid=this.$route.query.videoid;
			this._getvideodata();	
			this._getrecommendList();
			this.getcommentlist();
		},
		//获取当前id的视频信息
        _getvideodata(){
			axios.get('/api/upload/videoDetail?videoid='+this.videoid,{}).then((res)=>{
				console.log(res.data);
				this.videodata=res.data.data.videodata;	
				this.commentNum=res.data.data.videodata.Comment.length;
				this.userInfo=res.data.data.userdata;
				//做点赞和收藏的判断	
				this.getUserInfo();
				this.loading=false;
			})
        },
		_getrecommendList(){
			axios.get('/api/upload/videoList?pending=1',{}).then((res)=>{
				console.log(res.data);
				if(res.data.code){
					// this.userlist=res.data.userinfo;
            		this.recommendList=res.data.videolist;
				}
				
			})
		},
        getcommentlist(){
			this.isEmptycommentlist=false;
			axios.get('/api/users/getcommentlist?videoid='+this.videoid,{}).then((res)=>{
				   console.log(res.data);
				   if(res.data.code){
					   if(res.data.data.Comment.length==0){
						   this.isEmptycommentlist=true;
						//    return ;
					   }
					   this.commentlist=res.data.data.Comment;
					}
			})
        },
        pullup(){
			// this.recommenstart=this.recommenlen+this.recommenstart;
			// this.loading=true;
		    // this._getmorerecList();			    
        },
		onColl(){
			// console.log("1");
			if(this.loginstatus){
				//发收藏请求
				if(this.isColl){
					this.deleteCollect();
				}else{
					this.addCollect();
				}				
			}else{
				this.$vux.toast.text('登录后才能收藏喔！', 'middle');
			}
		},
		deleteCollect(){
			axios.post('/api/users/deleteCollect',{
				status:1,
				userid:window.localStorage.getItem('userid'),
				videoid :this.videoid,
			}).then((res)=>{
				if(res.data.code){
					this.isColl=!this.isColl;
					// console.log(res.data);
					this._getvideodata();
					this.$vux.toast.text('取消收藏成功', 'middle');
				}else{
					this.$vux.toast.text('取消收藏失败', 'middle');
				}					
			})
		},
		addCollect(){		
			axios.post('/api/users/addCollect',{
				status:1,
				userid:window.localStorage.getItem('userid'),
				videoid :this.videoid,
                tit:this.videodata.tit,
				desc:this.videodata.desc,
				videoUrl:this.videodata.videoUrl,
				videoimg:this.videodata.videoimg,
			}).then((res)=>{
				if(res.data.code){
					this.isColl=!this.isColl;
					// console.log(res.data);
					this._getvideodata();
					this.$vux.toast.text('收藏成功', 'middle');
				}else{
					this.$vux.toast.text('收藏失败', 'middle');
				}
					
			})
			
		},
		lookmore(){
			// this.hotlistflag='all';
			// this._gethotlist();
			// this.$nextTick(() => {
			// 	this.$refs.scroller.reset();
			// })
		},
		backtotop(){
			this.$refs.scroller.reset({top:0});
		},
		selectItem(item){
			this.$router.push({ path: '/videoDetail', query: {videoid:item.videoid}});
		},
		// goIndexPage(){
		// 	this.$router.push({ path: '/index/recommend'});
		// },
		onscroll(position){
			if(position!=null){
				if(position.top>200){
					this.showbtn=true;
				}else{
					this.showbtn=false
				}
			}			
		},
		// lastnextVideo(arr,currentindex){
		// 	if(arr.length<=3){
		// 		this.currentVideoList=arr;
		// 		return false;
		// 	}else{				
		// 		if(arr.length-1==currentindex){
		// 			this.currentVideoList=arr.slice(currentindex-2,currentindex+1);
		// 			this.currentVideoIndex=2;
		// 			return false;
		// 		}
		// 		if(currentindex==0){
		// 			this.currentVideoList=arr.slice(currentindex,currentindex+3);
		// 			this.currentVideoIndex=0;
		// 			return false;
		// 		}
		// 		this.currentVideoList=arr.slice(currentindex-1,currentindex+2);
		// 		this.currentVideoIndex=1;
		// 	}			
		// },
		startplay(){		
			let date=new Date();	
			axios.post('/api/users/addhistory',{
				status:1,
				userid:window.localStorage.getItem('userid'),
				videoid :this.videoid,
				tit:this.videodata.tit,
				playtime:date.toLocaleString()
			}).then((res)=>{
				if(res.data.code){
					console.log("开始播放，记录");
				}else{
					console.log("记录失败");
				}					
			})
		},
		onVote(){
			if(this.loginstatus){
				//发收藏请求
				if(this.isVote){
					this.deleteVote();
				}else{
					this.addVote();
				}				
			}else{
				this.$vux.toast.text('登录后才能点赞喔！', 'middle');
			}
		},
		deleteVote(){
			axios.post('/api/users/deleteVote',{
				userid:window.localStorage.getItem('userid'),//点赞人id
				videoid :this.videoid,
				
			}).then((res)=>{
				if(res.data.code){
					this.isVote=!this.isVote;
					// console.log(res.data);
					this._getvideodata();
					this.$vux.toast.text('取消点赞成功', 'middle');
				}else{
					this.$vux.toast.text('取消点赞失败', 'middle');
				}					
			})
		},
		addVote(){		
			axios.post('/api/users/addVote',{
				userid:window.localStorage.getItem('userid'),
				videoid :this.videoid,
				authorid:this.videodata.userid,
				videotit:this.videodata.tit,
				videoUrl:this.videodata.videoUrl,
				videoimg:this.videodata.videoimg,
			}).then((res)=>{
				if(res.data.code){
					this.isVote=!this.isVote;
					// console.log(res.data);
					this._getvideodata();
					this.$vux.toast.text('点赞成功', 'middle');
				}else{
					this.$vux.toast.text('点赞失败', 'middle');
				}
					
			})
			
		},
		goComment(){

		},
		//获取当前用户的信息做收藏点赞的更新
		getUserInfo(){
			if(!this.loginstatus){
				return ;
			}
			axios.get("/api/users/getuserinfo",{
				params:{
					userid:window.localStorage.getItem("userid"),
				},
			}).then((res)=>{
				if(res.data.code){
					this.userBaseInfo=res.data.data;
					this.isCollected();
					this.isVoted();
				}				
			})
		},
		//评论
		sendcomment(){
			// if(this.loginstatus){
			// 	//发收藏请求
			// 	if(this.isColl){
			// 		this.deleteCollect();
			// 	}else{
			// 		this.addCollect();
			// 	}				
			// }else{
			// 	this.$vux.toast.text('登录后才能收藏喔！', 'middle');
			// }
			this.loading=true;
			if(this.commentCentent!=""){
				axios.post("/api/users/addcomment",{
					content:this.commentCentent,
					videoid:this.videoid,
					actionid:window.localStorage.getItem('userid'),
					userid:this.videodata.userid,
					videotit:this.videodata.tit,
					videoUrl:this.videodata.videoUrl,
					videoimg:this.videodata.videoimg,
				}).then((res)=>{
					console.log(res.data);
					if(res.data.code){
						this.commentCentent="";
						this.getcommentlist();
						this.isEmptycommentlist=false;
						this.$vux.toast.text('评论成功', 'middle');
						this.loading=false;
					}else{
						this.commentCentent="";
						this.$vux.toast.text('评论失败', 'middle');
						this.loading=false;
					}
					
				})
			}
		}
	},
	watch: {
		'$route' (to, from) {
			this.hotlistflag="three";
			this.hotlist=[];
			this.initDetail();				
			this.$refs.scroller.reset({top:0})
		},
		userInfo(){
			// console.log(this.userInfo);
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
        height: 14rem;
	}
	.action{
		height: 3rem;
		overflow: hidden;
		div{
			float: left;
			// line-height: 3rem;
			width: 33.33%;
			height: 100%;
			color: #666;
			text-align: center;
			&.active{
				color: red;
			}
		}
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
		font-size: 0.8rem;
		line-height: 1.2rem;
		.author{
			font-size: 1rem;
        	color: #333;
			img{
				border-radius: 50%;
				width: 1.8rem;
				height: 1.8rem;
				vertical-align: middle;
				margin-right: .8rem;
			}
		}
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
		word-wrap: break-word;
    	word-break: normal;
	}
	.moviedescription{
		margin-top: 1rem;
		word-wrap: break-word; 
		word-break: normal; 
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
	.viewcount{
		span{
			color: #ccc;
			float: right;
			margin-left: 1rem;
			font-size: 1.4rem;
			line-height: 2rem;
		}
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
	// .goIndexPage {
	// 	position: fixed;
	// 	bottom: 2rem;
	// 	right: 2rem;
	// 	width: 3rem;
	// 	height: 3rem;
	// 	text-align: center;
	// 	background: rgba(0,0,0,.4);
	// 	border-radius: 50%;  
	// 	span {
	// 		color: #fff;
	// 		font-size: 2rem;
	// 		line-height: 3rem; 
	// 	}
	// }
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
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			padding: 0 1rem;
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
	.comment{
		position: fixed;
		bottom: 0;
		left: 0;
		width:100%;
		height: 3rem;
		background: #f3f3f3;
		padding: .5rem 1rem;
		border-top:1px solid #ccc;
		input{
			width: 85%;
			border-radius: 1rem;
			height: 100%;
			border: 1px solid #ccc;
			outline: none;
			padding-left: 1rem;
		}
		span{
			width: 15%;
			text-align: center;
			line-height: 2rem;
			display: inline-block;
			color: #ccc;
			.active{
				color: #333;
			}
		}
	}
.article_info {
  padding: .8rem;
}
.article_img {
  height: 12.7rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: inherit;
    display: block;
	// padding: 2rem;
  }
}
.recommond-list {
  section {
    margin: .8rem;
    box-shadow: 0 0 5px 2px rgba(0,0,0,.2);
  }
}
.article_length {
  position: absolute;
  right: 0;
  bottom: 2rem;
  width: 5rem;
  height: 1.2rem;
  padding: 0 0.5rem;
  background: linear-gradient(262deg,rgba(0,0,0,0.53) 0,rgba(0,0,0,0) 80%);
}
.article_length_value {
  display: block;
  float: right;
  color: white;
  font-size: 0.8rem;
  line-height: 1.2rem;
}
.article_time {
  padding-top: .6rem;
  color: #bababa;
  font-size: 0.6rem;
}
.article_title {
  padding: .5rem 0;
  font-size: 1.2rem;
}
.article_desc {
  // height: 3rem;
  line-height: 1rem;
  width: 21.133rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
}
.article_bottom {
  position: relative;
  border-top: 0.06rem solid #bababa;
  padding: 0.6rem 0;
  p {
    color: #bababa;
    font-size: 0.6rem;
    line-height: 1rem;
  }
}

</style>

