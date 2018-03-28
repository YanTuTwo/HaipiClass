<template>
    <div>
        <x-header :left-options="{backText: ''}">播放记录<a slot="right" @click="clearhistory" v-if="!ishistoryListEmpty">清空</a></x-header>
        <scroller lock-x :scrollbar-y=false height="-46" ref='scroller'  @on-pullup-loading="pullup" @on-scroll='onscroll'>
            <div class="history">
                <div class="history-item" v-for="item in historyList" @click="goPlayDetail(item)">
                    <p class="tit">{{item.tit}}</p>
                    <p class="author text-grey">{{item.director}} | <span>{{item.playtime}}</span></p>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
import Vue from "vue"
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin} from 'vux'
import axios from "axios"
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin);
export default {
    data(){
        return {
            historyList:[],
            ishistoryListEmpty:false,
        }
    },
    components:{
        XHeader,
        Scroller,
    },
    mounted(){
        this.getHistory();
    },
    methods:{
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
           
        }
    }
}
</script>
<style lang="scss" scoped>
.history{
    background: #fff;
    .history-item{
        // height: 4rem;
        width: 100%;
        padding: .5rem 1rem;
        border-bottom: 1px solid #eee;
        p{
            line-height: 1.5rem;
        }
    }
}

</style>
