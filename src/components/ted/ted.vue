<template>
    <div class="ted-content" ref='tedcontent'>
		<scroller :height='scrolltop' lock-x :scrollbar-y=false ref="scroller" use-pullup @on-pullup-loading="pullup" @on-scroll='onscroll' :pullup-config="{ loadingContent: 'Loading...',height:50,downContent: '放手刷新啦!',
  upContent: '上拉加载更多',content:'努力加载中····'}">
			<div class="contentlist">
				<classlist :data="classlist" @select='selectItem'></classlist>
			</div>
		</scroller>
		<div class="backtotop" @click="backtotop" v-show="showbtn">
			<span class="iconfont icon-jiantoushang"></span>
		</div>
		<loading :show="loading" text="loading"></loading>
	</div>
</template>
<script>
import { Scroller, Loading } from 'vux'
import Classlist from '@/common/classlist/classlist'
import axios from 'axios'
export default {
    data(){
		return {
			id: 4,
			type: 5,
			cursor: 0,
			pagesize: 10,
			scrolltop: '',
			classlist: [],
			loading: false,
			showbtn: false
		}
	},
	components: {
		Scroller,
		Classlist,
		Loading
	},
	created() {
		this._getclasslist();
	},
	mounted() {
        
		this.initScroll()
	},
    methods:{
        _getclasslist(){
            axios.get('/api/getclasslist', {
				params: {
					id: this.id,
					type: this.type,
					cursor: this.cursor,
					pagesize: this.pagesize
				}
			}).then((res) => {
				this.classlist = this.classlist.concat(res.data.data);
				this.loading = false;
			})
        },
        initScroll(){
            let scrolltop = this.$refs.tedcontent.offsetTop;
			this.scrolltop = (document.documentElement.clientHeight - scrolltop) + 'px';
			console.log(this.$refs.tedcontent)
        },
        pullup(){
			this.cursor = this.pagesize + this.cursor;
			this.loading = true;
			this._getclasslist();
			this.$nextTick(() => {
				this.$refs.scroller.reset();
				this.$refs.scroller.donePullup();
			})
        },
        onscroll(position){
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
        goPlayDetail(plid,contentid){
			this.$router.push({ path: '/playDetail', query: { plid: plid,contentid:contentid}})
		},
		selectItem(plid,contentid){
			this.goPlayDetail(plid,contentid);
		},
    }
}
</script>
<style lang="scss" scoped>
.backtotop {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	width: 3rem;
	height: 3rem;
	text-align: center;
	background: rgba(0,0,0,.4);
	border-radius: 50%; 
	span {
		color: #fff;
		font-size: 2rem;
		line-height: 3rem; 
	} 
}
</style>
