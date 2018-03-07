<template>
    <div class="usercenter">
        <blur :blur-amount=0 :url="bgAvatarUrl" :height="bgAvatarHeight">
            <p class="center"><img src="../../assets/image/touxiang.jpeg"></p>
            <p class="username center">YanTuTu</p>
        </blur>
        <!-- <flexbox :gutter="0">
            <flexbox-item v-for="(img, index) in bgList" :key="index"><img :src="img" style="width:100%" @click="bgAvatarUrl = img"/></flexbox-item>
        </flexbox> -->
        <div class="bgscroll">
            <scroller lock-y :scrollbar-x=false>
                <div class="box1" id="scroll">
                    <div class="box1-item" v-for="(img, index) in bgList"><img :src="img" style="width:100%" @click="bgAvatarUrl = img"/></div>
                    <div class="box1-item addbg" ><span>+</span></div>
                </div>
            </scroller>
        </div>
        <group :title="('咚咚咙咚呛咚呛。')">
             <div class="funclist">
                <dl>
                    <dd><span class="iconfont icon-msnui-sms-bubble"></span>我的消息</dd>
                    <dd><span class="iconfont icon-gerenxinxi1"></span>个人信息</dd>
                    <dd><span class="iconfont icon-shoucangyingyuan"></span>我的收藏</dd>
                    <dd><span class="iconfont icon-icon--"></span>我的作品</dd>
                    <dd><span class="iconfont icon-jiluliebiao"></span>播放记录</dd>
                    <dd><span class="iconfont icon-guanyuwomen"></span>关于作者</dd>
                    <dd><span class="iconfont icon-zhuxiaoguanji"></span>退出登录</dd>
                </dl>
            </div>
        </group>
       
    </div>
</template>
<script>
import { Flexbox, FlexboxItem, Blur,Scroller,Group,CellBox } from 'vux'
export default {
    data(){
        return {
            bgList:[
                'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
                'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
                'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg',
            ],
            bgAvatarUrl:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
            bgAvatarHeight:0,
        }
    },
    components:{
        Blur,
        Flexbox,
        FlexboxItem,
        Scroller,
        Group,
        CellBox
    },
    mounted(){
        document.getElementById('scroll').style.width=(this.bgList.length+1)*6+'rem';
        this.bgAvatarHeight=parseFloat(document.querySelector('html').style.fontSize)*12;
       
    }
}
</script>
<style lang="scss" scoped>
.usercenter{
    // background: #fafafa
    .funclist{
        dd{
            height: 3rem;
            line-height: 3rem;
            font-size: 1rem;
            color:  #000;
            padding:0 .8rem 0 3rem;
            position: relative;
            span{
                font-size: 1.5rem;
                position: absolute;
                left: .75rem;;
                color:rgb(66, 66, 66);
            }
        }
    }
}
.center {
  text-align: center;
  padding-top: 1rem;
  color: #fff;
  font-size: 1.3rem;
}
.center img {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.bgscroll{
    width: 100%;
    height: 4rem;
    overflow: hidden;
    .box1 {
        height: 4rem;
        position: relative;
    }
    .box1-item {
        width: 6rem;
        height: 4rem;
        background-color: #ccc;
        display:inline-block;
        float: left;
        text-align: center;
    }
    .addbg{
        box-sizing: border-box;
        border: 2px dashed #ccc;
        font-size: 4rem;
        text-align: center;
        line-height: 4rem;
        color: #cccccc;
        background: #fff;
    }
}
</style>

