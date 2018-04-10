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
                <ul>
                    <li>
                        <div class="avatarimg"><img src="http://193.112.95.221:9999/images/avatarimg/1522219651924admin.png" alt=""></div>
                        <p class="avatar text-primary">高冷逗比女神经 <span class="text-grey">赞了你的评论</span></p>
                        <p class="commentcon">我擦，我上着班呢，，以为外放了。。。着班呢，，以为外放了。。。着班呢，，以为外放了。。。着班呢，，以为外放了。。。着班呢，，以为外放了。。。</p>
                        <span class="commenttime">2018/2/2</span>
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
        this.getHistory();
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
        getHistory(){
            let userid=window.localStorage.getItem('userid');
            axios.get('/api/users/gethistory?userid='+userid).then((res)=>{
				if(res.data.code){
                    console.log(res.data.data);
                    if(res.data.data==''){
                        this.ishistoryListEmpty=true;
                    }
                    this.historyList=res.data.data.reverse();
				}else{
                    this.$vux.toast.text('获取失败', 'middle');
				}					
			})
        },
        clearhistory(){
            const self = this // 需要注意 onCancel 和 onConfirm 的 this 指向
            this.$vux.confirm.show({
            // 组件除show外的属性
                title: '清除所有播放记录',
                content: 'Are you sure?',
                onConfirm () {
                    axios.post('/api/users/delehistory',{
                        userid:window.localStorage.getItem('userid'),
                    }).then((res)=>{
                        if(res.data.code){
                            self.historyList=[];
                            console.log("清空记录成功");
                            self.ishistoryListEmpty=true;
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
    font-size: .8rem;
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
