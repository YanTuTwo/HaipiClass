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
        <scroller lock-x :scrollbar-y=false :height="scrolltop" ref='scroller'  @on-pullup-loading="pullup" @on-scroll='onscroll'>
            <div class="noticeWrap">
                <ul v-if="Tabindex==0">
                    <li v-for="voteitem in votelist">
                        <div class="avatarimg"><video :src="voteitem.videoUrl"></video></div>
                        <p class="avatar text-primary">{{voteitem.actionid}} <span class="text-grey">点赞了你的视频</span></p>
                        <p class="commentcon">你上传的视频：{{voteitem.videotit}}</p>
                        <span class="commenttime">{{voteitem.time | ConvertTime}}</span>
                    </li>                   
                </ul>
                <ul v-if="Tabindex==1">
                    <li v-for="commitem in commentlist">
                        <div class="avatarimg"><video :src="commitem.videoUrl"></video></div>
                        <p class="avatar text-primary">{{commitem.actionid}} <span class="text-grey">评论了你的视频</span></p>
                        <p class="commentcon">{{commitem.content}}</p>
                        <span class="commenttime">{{commitem.time | ConvertTime}}</span>
                    </li>                   
                </ul>
                <ul v-if="Tabindex==2">
                    <li v-for="messitem in messagelist">
                        <div class="avatarimg"><video :src="messitem.videoUrl"></video></div>
                        <p class="avatar text-primary">{{messitem.actionid}} <span class="text-grey">赞了你的评论</span></p>
                        <p class="commentcon">{{messitem.content}}</p>
                        <span class="commenttime">{{messitem.time | ConvertTime}}</span>
                    </li>                   
                </ul>
            </div>
        </scroller>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin,ButtonTab,ButtonTabItem} from 'vux'
import axios from "axios"
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin);
export default {
    data(){
        return {
            // userBaseInfo:{},
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
        }
    },
    components:{
        XHeader,
        Scroller,
        ButtonTab,
        ButtonTabItem
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
        pullup(){

        },
        onscroll(){

        },
        getuserinfo(){
            axios.get("/api/users/getuserinfo",{
				params:{
					userid:window.localStorage.getItem("userid"),
				},
			}).then((res)=>{
				if(res.data.code){
                    this.noticeList=res.data.data.notice.reverse();
                    for(var i=0;i<this.noticeList.length;i++){
                        if(this.noticeList[i].type=="vote"){
                            this.votelist.push(this.noticeList[i])
                        }else if(this.noticeList[i].type=="message"){
                            this.messagelist.push(this.noticeList[i])
                        }else if(this.noticeList[i].type=="comment"){
                            this.commentlist.push(this.noticeList[i])
                        }
                    }
				}				
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
        padding-left: 3rem;
        width: 100%;
        height: 3.6rem;
        border-bottom: 1px solid #ccc;    
        line-height: 1.3rem;   
        .avatarimg{
            position: absolute;
            left: .6rem;
            top: .6rem;
            width: 2rem;
            height: 2rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            video{
                width: 100%;
                height: 100%;
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
