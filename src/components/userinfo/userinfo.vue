<template>
    <div class="userinfo">
        <x-header :left-options="{backText: ''}">个人信息</x-header>
        <div class="user_form">
            
            <group>      
                <cell primary="content"> 
                    <div class="uf_avatar">
                        <img :src="userBaseInfo.avatar" alt="">                
                    </div>
                    <label for="file"><span class="iconfont icon-icons01"></span>上传新头像</label>
                    <input type="file" id="file" @change="getFile($event)" style="display: none;">
                </cell>   
            </group>
            <group title="昵称：">       
                <x-input type="text" v-model="userBaseInfo.nickname" placeholder="屌大的名字"></x-input>
            </group>    
            <group title="年龄：">
                <cell :inline-desc="userBaseInfo.age" primary="content">
                    <range v-model="userBaseInfo.age"></range>
                </cell>
            </group>
            <group  title="性别：">
                <radio :options="sexlist" v-model="userBaseInfo.sex"></radio>
            </group>  
            <group title="简介：">
                 <x-textarea placeholder="该骚年啥都没写~" :show-counter="false" :rows="3" v-model="userBaseInfo.intro"></x-textarea>
            </group> 
            <div class="saveBtn">
                <x-button @click.native="showBtn" type="primary">修改</x-button>
            </div>                 
        </div> 
        <div>
            <confirm v-model="confirmshow"
            :title="('是否保存？')"
            @on-confirm="submitForm">
                <p style="text-align:center;">{{ ('Are you sure?') }}</p>
            </confirm>
        </div>
        <loading :show="loading" text="loading" ></loading>
    </div>
</template>
<script>
import Vue from "vue";
import {XHeader,XInput,Group,XButton,XTextarea,PopupRadio,Range,Cell,Radio,ToastPlugin,Confirm,Loading} from "vux";
Vue.use(ToastPlugin);
import {mapMutations} from "vuex"
import axios from 'axios';
export default {
    data(){
        return {
            oldurl:'',
            confirmshow:false,
            sexlist:['男','女'],
            compressData:'',//压缩处理后的图片数据           
            userBaseInfo:{},
            loading:false,
        }
    },
    components:{
        XHeader,XInput,Group,XButton,XTextarea,PopupRadio,Range,Cell,Radio,Confirm,Loading
    },
    mounted(){
        //发请求拿数据
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
			axios.get("/api/users/getuserinfo",{
				params:{
					userid:window.localStorage.getItem("userid"),
				},
			}).then((res)=>{
				if(res.data.code){
                    console.log(res.data.data);
                    this.userBaseInfo=res.data.data;
                    this.oldurl=res.data.data.avatar;
				}				
			})
		},
        getFile(event) {
            this.loading=true;
            var self=this;
            // self.userBaseInfo.file = event.target.files[0];
            console.log(event.target.files[0]);
            if(!event.target.files[0]){
                return false;
            }
            if (event.target.files[0].type.indexOf("image") == 0) {
                var fr = new FileReader();
                fr.readAsDataURL(event.target.files[0]);
                fr.onload=function(){
                    self.userBaseInfo.avatar=fr.result;
                    self.loading=false;
                    self.compress();                    
                }    
            }else{
                 this.$vux.toast.text('请选择图片进行上传', 'middle');
                 return ;
            }       
        },
        submitForm(){
            var self=this;
            // event.preventDefault();
            let formData=new FormData();             
            formData.append('file',self.compressData);
            formData.append('avatar',self.oldurl);
            formData.append('userid',window.localStorage.getItem('userid'));
            formData.append('nickname',self.userBaseInfo.nickname);
            formData.append('age',self.userBaseInfo.age);
            formData.append('sex',self.userBaseInfo.sex);
            formData.append('intro',self.userBaseInfo.intro);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            axios.post("/api/users/update",formData,config).then((res)=>{
                if(res.data.code){
                    this.$vux.toast.text('保存成功！', 'bottom');
                    this.SET_LOGINSTATUS(false);
                    setTimeout(function(){
                        self.$router.push('/index/recommend');
                        self.SET_LOGINSTATUS(true);
                    },1000)                    
                    
                }
            })       
        },
        showBtn(){
            this.confirmshow=true;
        },
        compress(){
            var self=this;
            // 压缩图片需要的一些元素和对象
            var reader = new FileReader(), img = new Image();
            // 缩放图片需要的canvas
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            img.src = self.userBaseInfo.avatar;
            img.onload=function(){
                console.log("开始压碎");
                var originWidth = this.width;
                var originHeight = this.height;
                // 最大尺寸限制
                var maxWidth = 400, maxHeight = 400;
                // 目标尺寸
                var targetWidth = originWidth, targetHeight = originHeight;
                // 图片尺寸超过400x400的限制
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                    
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);

                self.compressData=canvas.toDataURL();
            }           
        },
        ...mapMutations([
			'SET_LOGINSTATUS',
		])
    },
    watch:{
        userBaseInfo:{
            handler:function(val,oldval){  
                },  
            deep:true//对象内部的属性监听，也叫深度监听  
        }
    }
}
</script>
<style lang="scss" scoped>
.userinfo{
    width: 100%;
    height: 100%;
    color: #000;
    // background: #fff;
    .uf_avatar{
        // width: 100%;
        margin-left: 5rem;
        height: 4rem;
        text-align: center;
        // background: #fff;
        // padding: 0.5rem 0 0 0;
        float: left;
                
        img{
            vertical-align: middle;
            display: inline-block;
            box-sizing: border-box;
            width: 4rem;
            height: 4rem;
            border-radius: 50%; 
            border: 2px solid #ccc;
        }
    }
    .saveBtn{
        padding: 1rem;
    }
    label{
            display: inline-block;
            // width: 100%;
            margin-left: 2rem;
            line-height: 4rem;
            float: left;
            text-align: center; 
            font-size: 1rem;  
            span{
                font-size: 1rem; 
            }
        }
}
</style>
