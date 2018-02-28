<template>
    <div class="playDetail">
        <x-header :left-options="{backText: ''}">嗨皮课堂</x-header>
        <scroller lock-x :scrollbar-y=false height="-46" ref='scroller' use-pullup @on-pullup-loading="pullup">
			<div class="scrollerwrapper">
				<div class="videowrapper">
					<video width="100%" controls="true" :src="moviedata.mp4url" :poster="moviedata.imgPath" ref='video' ></video>
				</div>
				<p class="viewcount">播放：{{moviedata.hits}}次<span class="iconfont icon-star-copy" @click="onCollect" ref="collectbtn" :class="{collectedbtn: collected}"></span></p>
				<div class="movieinfo">
					<p class="movietit">{{moviedata.tit}}</p>
					<p class="movie-con"><span>讲师：</span>{{moviedata.director}}</p>
					<p class="movie-con"><span>标签：</span>{{moviedata.tags}}</p>
					<p class="movie-con"><span>类型：</span>{{moviedata.type}}</p>
					<p class="movie-con moviedescription"><span>课程简介：</span>{{moviedata.description}}</p>
				</div>
				<h3 class="hotcomments-tit">热门评论</h3>
				<div class="hotcomments">							
					<ul>
						<li v-for="item in hotlist">
							<div class="user">{{item.siteName+item.location}}网友  {{item.nickname}}<span>{{item.createTime}}</span></div>
							<p class="comments-con" v-html="item.content"></p>
						</li>
					</ul>
					<div class="morebtn" @click="lookmore" v-show="hotlistflag=='three'">查看更多······</div>
				</div>
				<h3 class="aboutrecommend">相关推荐</h3>
				<listview :data="recommendList"  @select="selectItem"></listview>
			</div>		
		</scroller>        
    </div>
</template>
<script>
import Vue from 'vue'
import { XHeader,Scroller,Loading,Actionsheet,ToastPlugin } from 'vux'
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
			height:'',
			loading:true,
			hotlistflag:'three',
			recommenstart:0,
			recommenlen:5,
			showMenus:false,
			menus:{
				menu1: '分享到朋友圈',
        		menu2: '分享到QQ'
			},
			collected:false,
			lastTime:0
        }
    },
    components:{
        XHeader,
		Scroller,
		Loading,
		listview,
		Actionsheet
    },
    mounted(){
        console.log(this.$route.query);
		this.initDetail();
    },
    methods:{
		initDetail(){
			this.plid=this.$route.query.plid;
			this.contentid=this.$route.query.contentid;
			this._getmoviedata();	
			this._gethotlist();
		},
        _getmoviedata(){
			axios.get('http://39.108.233.223:8080/api/getMovieList?plid='+this.plid+'&start='+this.recommenstart+'&len='+this.recommenlen).then((res)=>{
				this.moviedata=res.data[0];
				this.recommendList=	res.data[1];
				this.loading=false;
			})
        },
        _gethotlist(){

        },
        pullup(){

        },
		onCollect(){

		},
		lookmore(){

		},
		selectItem(plid,contentid){
			this.$router.push({ path: '/playDetail', query: { plid: plid,contentid:contentid}})
		}
    },
	watch: {
		'$route' (to, from) {
		this.initDetail();
		this.$refs.scroller.reset({top:0})
    }
}
}
</script>
<style lang="scss" scoped>

</style>

