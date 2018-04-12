<template>
    <div>
        <x-header :left-options="{backText: ''}">我的消息<a slot="right" @click="clearhistory" v-if="!ishistoryListEmpty">清空</a></x-header>
        <div class="buttonTab">
            <button-tab v-model="Tabindex">
                <button-tab-item @on-item-click="onChangeTab">动态</button-tab-item>
                <button-tab-item @on-item-click="onChangeTab">评论</button-tab-item>
                <button-tab-item @on-item-click="onChangeTab">通知</button-tab-item>
            </button-tab>
        </div>   
        <div ref="scrollerwrapper">
        <scroller lock-x :scrollbar-y=false :height="scrolltop" ref='scroller' @on-scroll='onscroll'>
            <div class="noticeWrap">
                <ul v-if="Tabindex==0">
                    <li v-for="voteitem in votelist" v-if="!isEmptyvotelist">
                        <div class="avatarimg"><img :src="voteitem.videoimg"/></div>
                        <p class="avatar text-primary">{{voteitem.actionid}} <span class="text-grey">点赞了你的视频</span></p>
                        <p class="commentcon">你上传的视频：{{voteitem.videotit}}</p>
                        <span class="commenttime">{{voteitem.time | ConvertTime}}</span>
                    </li>
                    <li v-if="isEmptyvotelist" style="padding: 0px;padding-top:  2em;height:  auto;">
						<load-more :show-loading="false" :tip="('暂无动态')"></load-more>
					</li>                   
                </ul>
                <ul v-if="Tabindex==1">
                    <li v-for="commitem in commentlist" v-if="!isEmptycommentlist">
                        <div class="avatarimg"><img :src="commitem.videoimg"/></div>
                        <p class="avatar text-primary">{{commitem.actionid}} <span class="text-grey">评论了你的视频</span></p>
                        <p class="commentcon">{{commitem.content}}</p>
                        <span class="commenttime">{{commitem.time | ConvertTime}}</span>
                    </li> 
                    <li v-if="isEmptycommentlist" style="padding: 0px;padding-top:  2em;height:  auto;">
						<load-more :show-loading="false" :tip="('暂无评论')"></load-more>
					</li>                   
                </ul>
                <ul v-if="Tabindex==2">
                    <li v-for="messitem in messagelist" v-if="!isEmptymessagelist">
                        <div class="avatarimg"><img src="../../assets/image/touxiang.jpeg"/></video></div>
                        <p class="avatar">审核视频： <span class=" text-primary">{{messitem.videotit}}</span></p>
                        <p class="pending">审核结果：{{messitem.pending==1?"通过":"未通过"}}</p>
                        <p class="commentcon" v-if="messitem.pending==2">原因：{{messitem.content}}</p>
                        <span class="commenttime">{{messitem.time | ConvertTime}}</span>
                    </li>
                    <li v-if="isEmptymessagelist" style="padding: 0px;padding-top:  2em;height:  auto;">
						<load-more :show-loading="false" :tip="('暂无通知')" background-color="transparent"></load-more>
					</li>                    
                </ul>
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
import Vue from "vue"
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin,ButtonTab,ButtonTabItem,LoadMore,Loading} from 'vux'
import axios from "axios"
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin);
export default {
    data(){
        return {
            // userBaseInfo:{},
            loading:false,
            votelist:[],
            messagelist:[],
            commentlist:[],
            noticeList:[
                {
                    userid:'11111',
                    videoid:'2322131',
                    type:0,
                    content:'很不错噢'
                }
            ],
            ishistoryListEmpty:false,
            Tabindex:0,
            scrolltop:'',
            showbtn:'',
            isEmptyvotelist:false,
            isEmptycommentlist:false,
            isEmptymessagelist:false,
        }
    },
    components:{
        XHeader,
        Scroller,
        ButtonTab,
        ButtonTabItem,
        LoadMore,
        Loading
    },
    mounted(){
        this.getuserinfo();
        this.initScroll();
    },
    methods:{
        initScroll(){
			let scrolltop=this.$refs.scrollerwrapper.offsetTop;
			this.scrolltop=(document.documentElement.clientHeight-scrolltop)+'px';
			console.log(scrolltop);
        },
        onscroll(){
            if(position!=null){
				if(position.top>200){
					this.showbtn=true;
				}else{
					this.showbtn=false
				}
			}
        },
        backtotop(){
			this.$refs.scroller.reset({top:0});
        },
        getuserinfo(){
            this.loading=true;
            axios.get("/api/users/getuserinfo",{
				params:{
					userid:window.localStorage.getItem("userid"),
				},
			}).then((res)=>{
				if(res.data.code){
                    this.noticeList=res.data.data.notice.reverse();
                    for(var i=0;i<this.noticeList.length;i++){
                        if(this.noticeList[i].type=="vote"){
                            this.votelist.push(this.noticeList[i]);
                        }else if(this.noticeList[i].type=="message"){
                            this.messagelist.push(this.noticeList[i])
                        }else if(this.noticeList[i].type=="comment"){
                            this.commentlist.push(this.noticeList[i])
                        }
                    }
                    if(this.votelist.length==0){
                        this.isEmptyvotelist=true;
                    }
                    if(this.messagelist.length==0){
                        this.isEmptymessagelist=true;
                    }
                    if(this.commentlist.length==0){
                        this.isEmptycommentlist=true;
                    }
                }	
                this.loading=false;			
			})
        },
        clearhistory(){
            const self = this // 需要注意 onCancel 和 onConfirm 的 this 指向
            this.$vux.confirm.show({
            // 组件除show外的属性
                title: '清除记录',
                content: 'Are you sure?',
                onConfirm () {
                    axios.post('/api/users/delenotice',{
                        userid:window.localStorage.getItem('userid'),
                        type:self.Tabindex,//0是点赞，1是评论，2是通知
                    }).then((res)=>{
                        if(res.data.code){
                            self.votelist=[],
                            self.commentlist=[],
                            self.messagelist=[],
                            self.getuserinfo();
                            // self.ishistoryListEmpty=true;
                            console.log("清空成功");
                        }else{
                            console.log("清空失败");
                        }					
                    })
                }
            })
        },
        goPlayDetail(item){
            if(item.id){
                let id=item.id;
                this.$router.push({ path: '/hpplayDetail', query: { plid: plid,contentid:contentid}})
            }else{
                let plid=item.plid;
                let contentid=item.contentid;
                this.$router.push({ path: '/playDetail', query: { plid: plid,contentid:contentid}})
            }          
           
        },
        onChangeTab(){
        }
    }
}
</script>
<style lang="scss" scoped>
.buttonTab{
    padding: 1rem;
}
.noticeWrap{
    background: #fff;
    font-size: .9rem;
    li{
        position: relative;
        padding: .5rem 1rem;
        padding-left: 4.2rem;
        width: 100%;
        height: 4.6rem;
        border-bottom: 1px solid #ccc;    
        line-height: 1.3rem;   
        background-color: transparent;
        .avatarimg{
            position: absolute;
            left: .6rem;
            top: .6rem;
            width: 3rem;
            height: 3rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .commenttime{
            position: absolute;
            top: .3rem;
            right: .3rem;
            color: #ccc;
        }
        .commentcon{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            color: #333;
        }
    }
}

</style>
