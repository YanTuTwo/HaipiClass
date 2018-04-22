<template>
    <div class="userCollect">
        <x-header :left-options="{backText: ''}">我的收藏</x-header>
        <div class="buttonTab">
            <button-tab v-model="Tabindex">
                <button-tab-item @on-item-click="onChangeTab">课程</button-tab-item>
                <button-tab-item @on-item-click="onChangeTab">娱乐</button-tab-item>
            </button-tab>
        </div>        
        <div ref="scrollerwrapper">
        <scroller lock-x :scrollbar-y=false :height="scrolltop" ref='scroller'  @on-scroll='onscroll'>
                <div>
                    <section  class="collectItem" v-for="(classItem,index) in CollectList" v-if="Tabindex==0" @click="onWyCollect(index)">
                        <div class="collectItem_img">
                            <img :src="classItem.img" alt="" />
                        </div>
                        <div class="collectItem_info">
                            <div class="collectItem_tit"><span>{{classItem.tit}}</span></div>
                            <div class="collectItem_desc"> 
                                <span class="collectItem_length">{{classItem.director}} | </span>                          
                                <span class="collectItem_playtimes">{{classItem.viewcount}}人观看</span>                    
                            </div>
                        </div>
                    </section>   
                    <section  class="collectItem" v-for="(funItem,index) in CollectList" v-if="Tabindex==1" @click="onHpCollect(index)">
                        <div class="collectItem_img">
                            <img :src="funItem.videoimg" />
                        </div>
                        <div class="collectItem_info">
                            <div class="collectItem_tit"><span>{{funItem.tit}}</span></div>
                            <div class="collectItem_desc">
                                <span class="collectItem_length">简介：{{funItem.desc}}, </span>
                                <!-- <span class="collectItem_playtimes">{{funItem.coll}}人收藏</span> -->
                            </div>
                        </div>
                    </section> 
                    <div v-if="isEmptylist && Tabindex==0" style="padding: 0px;padding-top:  2em;height:  auto;">
						<load-more :show-loading="false" :tip="('暂无课程收藏')" background-color="transparent"></load-more>
					</div> 
                    <div v-if="isEmptylist && Tabindex==1 " style="padding: 0px;padding-top:  2em;height:  auto;">
						<load-more :show-loading="false" :tip="('暂无娱乐收藏')" background-color="transparent"></load-more>
					</div>
                </div>
                        
        </scroller>
        </div>
        <loading :show="loading" text="loading" ></loading>  
    </div>
</template>
<script>
import axios from 'axios'
import {XHeader,Scroller,ButtonTab,ButtonTabItem,LoadMore,Loading} from 'vux'
export default {
    data(){
        return{
            Tabindex:0,
            scrolltop:'',
            usePullup:false,
            CollectList:[],
            loading:true,
            isEmptylist:false,
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
        this.initScroll();
        this.getCollectList();
    },
    methods:{
        initScroll(){
			let scrolltop=this.$refs.scrollerwrapper.offsetTop;
			this.scrolltop=(document.documentElement.clientHeight-scrolltop)+'px';
			console.log(scrolltop);
        },
        getCollectList(){
            this.loading=true;
            let userid=window.localStorage.getItem('userid')
            axios.get('/api/users/getCollectList?&userid='+userid+'&status='+this.Tabindex,).then((res)=>{
                console.log(res.data.data);
                if(res.data.code){
                    this.CollectList=res.data.data;
                    if(this.CollectList.length==0){
                        this.isEmptylist=true;
                    }
                    this.loading=false;
                }
            })
        },
        onChangeTab () {
            console.log(this.Tabindex);
            this.isEmptylist=false;
            this.getCollectList();
        },
        onscroll(){

        },
        onWyCollect(index){
            let plid=this.CollectList[index].plid;
            let contentid=this.CollectList[index].contentid;
            this.$router.push({ path: '/playDetail', query: { plid: plid,contentid:contentid}})
        },
        onHpCollect(index){
            let id=this.CollectList[index].videoid;
            this.$router.push({ path: '/videoDetail', query: { videoid: id}})
        }

    }
}
</script>
<style lang="scss" scoped>
.buttonTab{
    padding: 1rem;
}
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
        video{
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

