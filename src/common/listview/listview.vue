<template>
	<div class="recommond-list">
		<section v-for="(item,index) in data" @click="selectItem(index)">			 
			<div class="article_img">
			 	<img v-lazy="item.image"/>
			 	<div class="article_length">
				<span class="article_length_value">{{item.quantity}}</span></div>
			</div>
			<div class="article_info">
			 	<div class="article_time">{{item.publishTime}}</div>
			 	<div class="article_title">{{item.contentTitle}}</div>
			 	<div class="article_desc">{{item.contentDesc}}</div>
			 	<div class="article_bottom">
			 		<p>{{item.viewCount}}人观看</p>
			 		<span class="share"></span>
				</div>
			</div>
			
		</section>
	</div>	
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		components:{
		},
		props:{
			data:{
				type:Array,
				default:null
			}
		},
		methods:{
			selectItem(index){
				let plid=this.data[index].plid;
				let contentid=this.data[index].contentid;
				this.$emit('select',plid,contentid);
			}
		}
	}
</script>

<style lang="scss" scoped>
.article_info {
  padding: .8rem;
}
.article_img {
  height: 12.7rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: inherit;
    display: block;
  }
}
.recommond-list {
  section {
    margin: .8rem;
    box-shadow: 0 0 5px 2px rgba(0,0,0,.2);
  }
}
.article_length {
  position: absolute;
  right: 0;
  bottom: 2rem;
  width: 5rem;
  height: 1.2rem;
  padding: 0 0.5rem;
  background: linear-gradient(262deg,rgba(0,0,0,0.53) 0,rgba(0,0,0,0) 80%);
}
.article_length_value {
  display: block;
  float: right;
  color: white;
  font-size: 0.8rem;
  line-height: 1.2rem;
}
.article_time {
  padding-top: .6rem;
  color: #bababa;
  font-size: 0.6rem;
}
.article_title {
  padding: .5rem 0;
  font-size: 1.2rem;
}
.article_desc {
  // height: 3rem;
  line-height: 1rem;
  width: 21.133rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
}
.article_bottom {
  position: relative;
  border-top: 0.06rem solid #bababa;
  padding: 0.6rem 0;
  p {
    color: #bababa;
    font-size: 0.6rem;
    line-height: 1rem;
  }
}
.share {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 2.33rem;
  height: 2.33rem;
  background: url("share.png") no-repeat center center;
  background-size: 1.33rem;
}

</style>