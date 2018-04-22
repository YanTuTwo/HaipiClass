<template>
    <div class="funshare">
        <div class="scrollwrap"  ref='funshare'>
            <scroller ref="scroller" lock-x :scrollbar-y=false 
                :use-pulldown=true :height='scrolltop'
                @on-pulldown-loading='success' 
                :pulldownConfig="{ loadingContent: '<div></div>',upContent: '拉什么拉，快放手！',height:50,content: '下拉刷新',downContent: '下拉可刷新',}"
                @on-scroll='onscroll'>			
                <div class="video-list-wrap">				
                    <div class="videoitem" v-for="item in videoList" :key="item._id">
                        <div class="videowrapper"> 
                            <video width="100%" controls  :src="item.videoUrl"  ref='video' @play="startplay(item)" :poster="item.videoimg"></video>
                        </div>
                        <div class="author">
                            <img :src="item.userinfo.avatar" alt=""><span>{{item.userinfo.nickname}}</span>
                        </div>
                        <div class="video-detail" @click="goVideoDetail(item.videoid)">
                            <div class="video-tit">{{item.tit}}</div>
                            <div class="video-about">
                                <div class="video-zan">
                                    <span class="iconfont icon-dianzan"></span>
                                    <p>{{item.vote}}</p>    
                                </div>
                                <div class="video-col">
                                    <span class="iconfont icon-shoucangjia1"></span>
                                    <p>{{item.coll}}</p> 
                                </div>
                                <div class="video-comment">
                                    <span class="iconfont icon-pinglun"></span>
                                    <p>{{item.Comment | arrlength}}</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </scroller>
        </div> 
        <div class="backtotop" @click="backtotop" v-show="showbtn">
			<span class="iconfont icon-jiantoushang"></span>
		</div>
        <loading :show="loading" text="loading" ></loading>
    </div>
</template>
<script>
import { Scroller, Loading } from 'vux'
import axios from "axios"
export default {
    data(){
        return{
            showbtn: false,
            scrolltop:'',
            videoList:[],
            userlist:[],
            loading:false,
            playtStatus:true,
            commentList:[],
        }
    },
    components:{
        Scroller,
        Loading
    },
    computed:{

    },
    created(){					
		 this.getVideoList();
	},
    mounted(){
       
        this.initScroll();       
    },
    methods:{
        initScroll(){
            let scrolltop = this.$refs.funshare.offsetTop;
			this.scrolltop = (document.documentElement.clientHeight - scrolltop) + 'px';
			console.log(this.scrolltop)
        },
        getVideoList(){
            this.loading=true;
            axios.get('/api/upload/videoList?pending=1',{}).then((res)=>{
                // console.log(res.data);
                if(res.data.code){
                    // this.classlist.concat(res.data.data)
                    this.userlist=res.data.userinfo.reverse();
                    this.videoList=res.data.videolist.reverse();
                    for(var i=0;i<this.videoList.length;i++){
                        for(var j=0;j<this.userlist.length;j++){
                            if(this.videoList[i].userid==this.userlist[j].userid){
                                this.videoList[i].userinfo=this.userlist[j];
                            }
                        }                       
                    } 
                    this.initScroll();    
                    this.loading=false;
                }
            })
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
        //下拉刷新重新获取数据
		success(){
			setTimeout(()=>{
                this.videoList=[];
				this.getVideoList();
				this.$refs.scroller.reset({top:0})
			},1000)
        },
        backtotop(){
			this.$refs.scroller.reset({top:0});
        },
        goVideoDetail(id){
            this.$router.push({ path: '/videoDetail', query: {videoid:id}})
        },
        startplay(item){
            let date=new Date();	
			axios.post('/api/users/addhistory',{
				status:1,
				userid:window.localStorage.getItem('userid'),
				videoid :item.videoid,
				tit:item.tit,
				playtime:date.toLocaleString()
			}).then((res)=>{
				if(res.data.code){
					console.log("开始播放，记录");
				}else{
					console.log("记录失败");
				}					
			})
        }
    }
}
</script>
<style lang="scss" scoped>
.backtotop {
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
.videoitem{
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 18.2rem;
    background: #e5e5e5;
    video{
        max-height: 14rem;
    }
    .author{
        position: absolute;
        top: 1rem;
        left: 1rem;
        font-size: 1rem;
        color: #fff;
        // line-height: 1.8rem;
        img{
            border-radius: 50%;
            width: 1.8rem;
            height: 1.8rem;
            vertical-align: middle;
            margin-right: .8rem;
        }
        span{
            line-height: 1.8rem;
        }
    }
    .video-detail{
        height: 4rem;
        width: 100%;
        background: #fff;
        overflow: hidden;
        padding: .9rem 0;
        .video-tit{
            width: 60%; 
            height: 100%;
            float: left; 
            line-height: 1.2rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;  
            color: #333;       
            padding: 0 1rem; 
        }
        .video-about{
            width: 40%;
            float: left; 
            color: #cccccc;
            div{
                float: left;
                box-sizing: border-box;
                width: 33.33%;
                text-align: center;
                p{
                    font-size: .8rem;
                }
                span{     
                    color: #666;              
                    font-size: 1.3rem;
                }
            } 
        }
    }
}
</style>


