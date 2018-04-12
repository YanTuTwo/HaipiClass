<template>
    <div>
        <x-header :left-options="{backText: ''}">上传视频</x-header>
        <div class="upvieo_from">
            <label for="file" class="videolable"><span class="iconfont icon-shangchuan"></span>上传视频</label>
            <input type="file" id="file" @change="getFile($event)" style="display: none;">
            <p>{{file.name}}</p>
            <!-- <img :src="imgSrc" alt="" width="100%"> -->
            <video controls width="100%" ref="video" :src="videoSrc" id="video" style="display:none"></video>
            <x-progress :percent="percent" :show-cancel="false"></x-progress>
            <p class="text-grey ft-12">*上传过程中请勿离开本页面，否则会导致上传失败！</p>
        </div>
        <div class="upvideo_info">
            <group title="视频标题：">
                <x-textarea  :max="30"  :rows="2" v-model="videoTit"></x-textarea>
            </group>
            <group title="视频简介：">
                <x-textarea   :rows="3" v-model="videoDesc" :max="200"></x-textarea>
            </group>
            <p><x-button type="primary" :show-loading="btnloading" @click.native="putobject">submit</x-button></p>
        </div>
        
    </div>
</template>
<script>
import Vue from 'vue'
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin,XProgress,XButton,Group,XTextarea} from 'vux'
Vue.use(ToastPlugin);
import COS from "cos-js-sdk-v5"
import axios from "axios"
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            file:'',
            percent:0,
            btnloading:false,
            videoTit:'',
            videoDesc:'',
            cos:'',
            imgSrc:"",
            videoSrc:'',
        }
    },
    props:{
		userBaseInfo:{
			type:Object,
			default:{}
		}
	},
    components:{
        XHeader,XProgress,XButton,Group,XTextarea
    },
    mounted(){
    },
    methods:{
        getFile(event){
            var self=this;
            this.file=event.target.files[0];
            var fr = new FileReader();
            fr.readAsDataURL(event.target.files[0]);
            fr.onload=function(){
                console.log(fr);
                self.videoSrc=fr.result;  
                // console.log(self.$refs.video);
                // console.log(document.getElementById("video"))
                                              
            } 
            
            console.log(this.file);
        },
        saveData(location){
            var self=this;
            var date=new Date();
            var videoid=date.getTime()+window.localStorage.getItem('userid');
            let formData=new FormData();             
            formData.append('videoid',videoid);
            formData.append('tit',self.videoTit);
            formData.append('userid',window.localStorage.getItem('userid'));
            formData.append('desc',self.videoDesc);
            formData.append('uptime',date.getTime());
            formData.append('videoUrl',location);
            formData.append('imgfile',self.videoimg);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            axios.post('/api/upload/upvideo',formData,config).then((res)=>{
                if(res.data.code){
                    this.$vux.toast.text('上传成功，请耐心等待审核！', 'middle');
                    this.file='';
                    this.percent=0;
                    this.btnloading=false;
                    this.videoTit='';
                    this.videoDesc='';
                }               
            })
        },
        putobject(){
            this.saveImg(this.$refs.video); 
            if(this.videoTit=='' || this.videoDesc==''){
                this.$vux.toast.text('请填写视频相关信息', 'middle');
                
                return ;
            }
            if(this.file=='' || this.file.type.slice(0,5)!='video'){
                this.$vux.toast.text('请选择视频文件', 'middle');
                return ;
            }
            var date=new Date();
            this.btnloading=true;
            var cos = new COS({
                SecretId:'AKID3pW5WmQx7A52oUtWt8B6uW4U7e0JcU7Z',
                SecretKey:'4zxjNq6B9zeBXhgT4Thj4X0MWWKwLYfd',
            });
            var self=this;
            cos.putObject({
                Bucket:'haipiclass-1256246011',
                Region: 'ap-guangzhou',
                Key:date.getTime()+window.localStorage.getItem('userid'),
                Body:self.file,
                onProgress:function(progressData){
                    self.percent=progressData.percent*100;
                }
            },function(err,data){
                console.log(err||data);
                self.saveData(data.Location);
            });
        },
        saveImg(result){
            console.log("截取")
            var self=this;
		    var scale = 0.8;
			var canvas = document.createElement("canvas");
			canvas.width =  650;
			canvas.height =  400;
			canvas.getContext('2d').drawImage(result, 0, 0, canvas.width, canvas.height);
            self.imgSrc = canvas.toDataURL("image/png");
            self.videoimg=canvas.toDataURL();
            // saveImg=canvas.toDataURL("image/png")
        }

        
    }
}
</script>
<style lang="scss" scoped>
.upvieo_from{
    text-align: center;
    padding: 2rem 1rem 1rem 1rem;
    .videolable{
        display: inline-block;
        border: 2px solid #1991ec;
        width: 6rem;
        height: 2rem;
        line-height: 2rem;
        color: #1991ec;
        border-radius: .5rem;
    }
    p{
        margin: 1rem 0;
    }
}
.upvideo_info{
    p{
         padding: 1rem;
    }
   
}
</style>
