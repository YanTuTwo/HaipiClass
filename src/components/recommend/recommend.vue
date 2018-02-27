<template>
	<div class="recommend">
	<transition name="normal">
		<div ref="scrollerwrapper">
		<scroller ref="scroller" lock-x :scrollbar-y=false 
			:use-pulldown=true :height='scrolltop'
			@on-pulldown-loading='success' 
			@on-scroll-bottom='scrollbottom'
			:pulldownConfig="{ loadingContent: '<div></div>',upContent: '拉什么拉，快放手！',height:50,content: '下拉刷新',downContent: '下拉可刷新',}"
			@on-scroll='onscroll'>			
			<div class="index-content">				
				 <swiper loop auto :list="swiperdata" :index="index" @on-index-change="onIndexChange" @click.native="onClickPlay"></swiper>
				<div class="recommond-tit">
				 	<p>精彩推荐</p>
				</div>
				<listview :data="listdata"  @select="selectItem"></listview>
			</div>
		</scroller>
		</div>
	</transition>
	<div class="backtotop" @click="backtotop" v-show="showbtn">
		<span class="iconfont icon-jiantoushang"></span>
	</div>	
	<!-- <loading :show="loading" text="loading" ></loading> -->
	</div>
</template>
<script>
import Vue from 'vue'
import Listview from '@/common/listview/listview'
import { Swiper,Scroller} from 'vux'
// Vue.use(ToastPlugin);
import axios from 'axios'
import {mapMutations,mapGetters} from "vuex"
export default {
  
}
</script>
<style lang="scss" scoped>
.recommend{
	background: #f1f1f1;
}
</style>
