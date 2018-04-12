<template>
    <div class="myVideo">
        <x-header :left-options="{backText: ''}">我的作品</x-header>
        <div>
            <section  class="collectItem" v-for="item in myVideoList" @click="goVideoDetail(item)">
                <div class="collectItem_img">
                   <img :src="item.videoimg"/>
                </div>
                <div class="collectItem_info">
                    <div class="collectItem_tit"><span>{{item.tit}}</span></div>
                    <div class="collectItem_desc"> 
                        审核状态：<span class="collectItem_length" :class="{notpass:item.pending==2,pending:item.pending==0}">{{item.pending==0?"待审核":(item.pending==1?"已通过":"未通过")}}</span>                                             
                    </div>
                </div>
            </section> 
        </div>
    </div> 
</template>
<script>
import axios from 'axios'
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin} from 'vux'
export default {
    data(){
        return{
            ishistoryListEmpty:true,
            myVideoList:[],
        }
    },
    components:{
        XHeader
    },
    mounted(){
        this.getmyvideo();
    },
    methods:{
        getmyvideo(){
            let userid=window.localStorage.getItem('userid');
            axios.get('/api/users/getmyvideo?userid='+userid).then((res)=>{
				if(res.data.code){                   
                    this.myVideoList=res.data.data.reverse();
				}else{
                    this.$vux.toast.text('获取失败', 'middle');
				}					
			})
        },
        clearhistory(){

        },
        onWyCollect(){

        },
        goVideoDetail(item){
            if(item.pending==0){
                this.$vux.toast.text('请耐心等待审核！','middle');
                return ;
            }
            if(item.pending==2){
                this.$vux.toast.text('该视频审核未通过，请重新上传！','middle');
                return ;
            }
            let videoid=item.videoid;
            this.$router.push({ path: '/videoDetail', query: { videoid: videoid}})
        }
    }
}
</script>
<style lang="scss" scoped>
.collectItem{
    width: 100%;
    // height: 4.6rem;
    overflow: hidden;
	background: #f8f8f8;
   	border-bottom: 1px solid #eee;
   	padding: 1rem .8rem;
   	-webkit-box-sizing: border-box;
   	box-sizing: border-box;   
    .collectItem_img{
        float: left;
		width: 4.4rem;
		height: 3rem;
		margin-right: 0.8rem;
        img{
            width: 100%;
            height: 100%;
        }
    } 
    .collectItem_info{
        overflow: hidden;
		float: left;
		width: 18rem;
        .collectItem_tit{
            width: 100%;
            height: 1.4rem;
            margin-bottom: 0.3rem;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .collectItem_desc{
            font-size: .6rem;
   		    color: gray;  
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .notpass{
                color: red
            }
            .pending{
                color: rgb(255, 213, 114)
            }
        }
    }
    
}
</style>
