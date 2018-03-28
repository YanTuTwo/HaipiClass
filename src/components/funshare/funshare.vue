<template>
    <div class="funshare" ref='funshare'>
        <scroller :height='scrolltop' lock-x :scrollbar-y=false ref="scroller" use-pullup @on-pullup-loading="pullup" @on-scroll='onscroll' :pullup-config="{ loadingContent: 'Loading...',height:50,downContent: '放手刷新啦!',
  upContent: '上拉加载更多',content:'努力加载中····'}">
			<div class="contentlist">
				<div class="videoitem">
                    <div class="videowrapper">
                        <video width="100%" controls src="http://193.112.95.221:9999/video/IMG_0199.mp4" poster="http://open-image.nosdn.127.net/image/snapshot_movie/2013/3/V/M/M8OBKKBVM.jpg" ref='video' ></video>
                    </div>
                    <div class="author">
                        <img src="http://192.168.1.14:3000/images/avatarimg/admin.png" alt=""><span>hahahha</span>
                    </div>
                    <div class="video-detail">
                        <div class="video-tit">世界上做信服的是世界上做信服的是世界上做信服的是世界上做信服的是世界上做信服的是世界上做信服的是世界上做信服的是</div>
                        <div class="video-about">
                            <div class="video-zan">
                                <span class="iconfont icon-dianzan"></span>
                                <p>100</p>    
                            </div>
                            <div class="video-col">
                                <span class="iconfont icon-shoucangjia1"></span>
                                <p>100</p> 
                            </div>
                            <div class="video-comment">
                                <span class="iconfont icon-pinglun"></span>
                                <p>100</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="videoitem">
                    <div class="videowrapper">
                        <video width="100%" controls src="http://193.112.95.221:9999/video/IMG_0203.mp4" poster="http://open-image.nosdn.127.net/image/snapshot_movie/2013/3/V/M/M8OBKKBVM.jpg" ref='video' ></video>
                    </div>
                    <div class="author">
                        <img src="http://192.168.1.14:3000/images/avatarimg/admin.png" alt=""><span>hahahha</span>
                    </div>
                    <div class="video-detail">
                        <div class="video-tit">世界上做信服的是</div>
                        <div class="video-about">
                            <div class="video-zan">
                                <span class="iconfont icon-dianzan"></span>
                                <p>100</p>    
                            </div>
                            <div class="video-col">
                                <span class="iconfont icon-shoucangjia1"></span>
                                <p>100</p> 
                            </div>
                            <div class="video-comment">
                                <span class="iconfont icon-pinglun"></span>
                                <p>100</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="videoitem">
                    <div class="videowrapper">
                        <video width="100%"  src="http://192.168.1.14:3000/video/123.mp4" poster="http://open-image.nosdn.127.net/image/snapshot_movie/2013/3/V/M/M8OBKKBVM.jpg" ref='video' ></video>
                    </div>
                    <div class="author">
                        <img src="http://192.168.1.14:3000/images/avatarimg/admin.png" alt=""><span>hahahha</span>
                    </div>
                    <div class="video-detail">
                        <div class="video-tit">世界上做信服的是</div>
                        <div class="video-about">
                            <div class="video-zan">
                                <span class="iconfont icon-dianzan"></span>
                                <p>100</p>    
                            </div>
                            <div class="video-col">
                                <span class="iconfont icon-shoucangjia1"></span>
                                <p>100</p> 
                            </div>
                            <div class="video-comment">
                                <span class="iconfont icon-pinglun"></span>
                                <p>100</p> 
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</scroller>   
    </div>
</template>
<script>
import { Scroller, Loading } from 'vux'
export default {
    data(){
        return{
            scrolltop:'',
        }
    },
    components:{
        Scroller,
        Loading
    },
    mounted(){
        this.initScroll();
    },
    methods:{
        initScroll(){
            let scrolltop = this.$refs.funshare.offsetTop;
			this.scrolltop = (document.documentElement.clientHeight - scrolltop) + 'px';
			console.log(this.$refs.funshare)
        },
        pullup(){

        },
        onscroll(){

        }
    }
}
</script>
<style lang="scss" scoped>
.videoitem{
    width: 100%;
    position: relative;
    // margin-bottom: 1rem;
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


