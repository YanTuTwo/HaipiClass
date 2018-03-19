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
        <scroller lock-x :scrollbar-y=false :height="scrolltop" ref='scroller' :use-pullup="usePullup" @on-pullup-loading="pullup" @on-scroll='onscroll'
		:pullupConfig="{ loadingContent: '<load-more></load-more>',upContent: '加载中...',height:50,content: '上拉加载更多',downContent: '释放加载更多',}">
            
                <section  class="collectItem" v-for="(classItem,index) in testdata" v-if="Tabindex==0">
                    <div class="collectItem_img">
                        <img :src="classItem.img" alt="" />
                    </div>
                    <div class="collectItem_info">
                        <div class="collectItem_tit"><span>{{classItem.tit}}</span></div>
                        <div class="collectItem_desc">
                            <span class="collectItem_length">{{classItem.quantity}} | </span>
                            <span class="collectItem_playtimes">{{classItem.viewcount}}人观看</span>
                        </div>
                    </div>
                </section>   
                <section  class="collectItem" v-for="(funItem,index) in testdata" v-if="Tabindex==1">
                    <div class="collectItem_img">
                        <img :src="funItem.img" alt="" />
                    </div>
                    <div class="collectItem_info">
                        <div class="collectItem_tit"><span>{{funItem.tit}}</span></div>
                        <div class="collectItem_desc">
                            <span class="collectItem_length">{{funItem.quantity}} | </span>
                            <span class="collectItem_playtimes">{{funItem.viewcount}}人观看</span>
                        </div>
                    </div>
                </section>         
        </scroller>
        </div>
    </div>
</template>
<script>
import {XHeader,Scroller,ButtonTab,ButtonTabItem} from 'vux'
export default {
    data(){
        return{
            Tabindex:0,
            scrolltop:'',
            usePullup:false,
            testdata:[
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）',
                    quantity:"11'11",
                    viewcount:"2000"
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                },
                {
                    img:"http://39.108.233.223:9999/images/avatarimg/1521280479011admin.png",
                    tit:"【TED】如何掌控你的自由时间",
                    desc:'经常听有人抱怨自己很忙,没时间做这个做那个,情况真是这样的吗? 本期TED演讲者Laura Vanderkam女士将给大家带来一场抛开现象看本质的演讲。（编辑整理：网易公开课）'
                }

                
            ]
        }
    },
    components:{
        XHeader,
        Scroller,
        ButtonTab,
        ButtonTabItem
    },
    mounted(){
        this.initScroll();
        
    },
    methods:{
        initScroll(){
			let scrolltop=this.$refs.scrollerwrapper.offsetTop;
			this.scrolltop=(document.documentElement.clientHeight-scrolltop)+'px';
			console.log(scrolltop);
        },
        onChangeTab () {
            
        },
        pullup(){

        },
        onscroll(){

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

