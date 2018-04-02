<template>
    <div class="myVideo">
        <x-header :left-options="{backText: ''}">我的作品<a slot="right" @click="clearhistory" v-if="!ishistoryListEmpty">清空</a></x-header>
        <div>
            <section  class="collectItem">
                <div class="collectItem_img">
                    <img src="http://open-image.nosdn.127.net/image/snapshot_movie/2018/2/J/B/MDADR0QJB.jpg" alt="" />
                </div>
                <div class="collectItem_info">
                    <div class="collectItem_tit"><span>改变命运的机会课不多</span></div>
                    <div class="collectItem_desc"> 
                        <span class="collectItem_length">Yantutu</span>                                             
                    </div>
                </div>
            </section> 
            <section  class="collectItem">
                <div class="collectItem_img">
                    <img src="http://open-image.nosdn.127.net/image/snapshot_movie/2018/1/b/d/0fac1e5127a84f33813f1e8d4f7fabbd.jpg" alt="" />
                </div>
                <div class="collectItem_info">
                    <div class="collectItem_tit"><span>我顶顶顶顶</span></div>
                    <div class="collectItem_desc"> 
                        <span class="collectItem_length">Yantutu</span>                                             
                    </div>
                </div>
            </section> 
            <section  class="collectItem">
                <div class="collectItem_img">
                    <img src="http://open-image.nosdn.127.net/image/snapshot_movie/2018/1/2/d/4d032c9816cf4c6c8f02d60098c1df2d.jpg" alt="" />
                </div>
                <div class="collectItem_info">
                    <div class="collectItem_tit"><span>超搞笑蜡笔小新</span></div>
                    <div class="collectItem_desc"> 
                        <span class="collectItem_length">Yantutu</span>                                             
                    </div>
                </div>
            </section> 
            <section  class="collectItem">
                <div class="collectItem_img">
                    <img src="http://open-image.nosdn.127.net/image/snapshot_movie/2018/2/J/B/MDADR0QJB.jpg" alt="" />
                </div>
                <div class="collectItem_info">
                    <div class="collectItem_tit"><span>奥特曼打怪兽拉阿拉</span></div>
                    <div class="collectItem_desc"> 
                        <span class="collectItem_length">Yantutu</span>                                             
                    </div>
                </div>
            </section> 
        </div>
    </div> 
</template>
<script>
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin} from 'vux'
export default {
    data(){
        return{
            ishistoryListEmpty:true,
            CollectList:[],
        }
    },
    components:{
        XHeader
    },
    methods:{
        clearhistory(){

        },
        onWyCollect(){

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
        }
    }
    
}
</style>
