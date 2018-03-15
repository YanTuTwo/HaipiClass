<template>
    <div class="userinfo">
        <x-header :left-options="{backText: ''}">个人信息</x-header>
        <div class="user_form">
            <div class="uf_avatar">
                <img :src="avatar" alt="">                
            </div>
            <group>      
                <cell primary="content"> 
                    <label for="file"><span class="iconfont icon-icons01"></span>点击更改头像</label>
                    <input type="file" id="file" @change="getFile($event)" style="display: none;">
                </cell>   
            </group>
            <group title="昵称：">       
                <x-input type="text" v-model="name" placeholder="屌大的名字"></x-input>
            </group>    
            <group title="年龄：">
                <cell :inline-desc="age" primary="content">
                    <range v-model="age"></range>
                </cell>
            </group>
            <group  title="性别：">
                <radio :options="sex" v-model="defaultsex"></radio>
            </group>  
            <group title="简介：">
                 <x-textarea placeholder="该骚年啥都没写~" :show-counter="false" :rows="3"></x-textarea>
            </group> 
            <div class="saveBtn">
                <x-button @click.native="submitForm($event)" type="primary">保存</x-button>
            </div>                 
        </div> 
        
    </div>
</template>
<script>
import {XHeader,XInput,Group,XButton,XTextarea,PopupRadio,Range,Cell,Radio} from "vux"
import axios from 'axios';
export default {
    data(){
        return {
            name: '',
            age: 18,
            file: '',
            avatar:'http://192.168.1.141:3000/images/avatarimg/touxiang.jpeg',
            defaultsex:'男',
            sex:['男','女'],
            email:'',
        }
    },
    components:{
        XHeader,XInput,Group,XButton,XTextarea,PopupRadio,Range,Cell,Radio
    },
    mounted(){
        //发请求拿数据
    },
    methods:{
        getFile(event) {
            this.file = event.target.files[0];
            var self=this;
            var fr = new FileReader();
            fr.readAsDataURL(this.file);
            fr.onload=function(){
                self.avatar=fr.result;
            }
           
        },
        submitForm(event){
            console.log("1");
            var self=this;
            event.preventDefault();
            let formData=new FormData(); 
                formData.append('file',self.file);
                formData.append('userid',window.localStorage.getItem('userid'));
                formData.append('name',self.name);
                formData.append('age',self.age);
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                axios.post("/api/users/update",formData,config).then((res)=>{
                    console.log(res.data);
                })       
        },
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
        width: 100%;
        height: 4rem;
        text-align: center;
        // background: #fff;
        padding: 0.5rem 0 0 0;
                
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
            width: 100%;
            text-align: center; 
            font-size: 1rem;  
            span{
                font-size: 1rem; 
            }
        }
}
</style>
