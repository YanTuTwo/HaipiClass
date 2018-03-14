<template>
    <div class="userinfo">
        <x-header :left-options="{backText: ''}">个人信息</x-header>
        <form action="">
            <input type="text" value="" v-model="name" placeholder="请输入用户名">
            <input type="text" value="" v-model="age" placeholder="请输入年龄">
            <input type="file" @change="getFile($event)">
            <button @click="submitForm($event)">提交</button>
        </form>
    </div>
</template>
<script>
import {XHeader} from "vux"
import axios from 'axios';
export default {
    data(){
        return {
            name: '',
            age: '',
            file: ''
        }
    },
    components:{
        XHeader,
    },
    methods:{
        getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
        },
        submitForm(event){
            event.preventDefault();
            let formData=new FormData();
            
            formData.append('file',this.file);
            formData.append('userid',window.localStorage.getItem('userid'));
            formData.append('name',this.name);
            formData.append('age',this.age);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            axios.post("/api/users/update",formData,config).then((res)=>{
                console.log(res.data);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.userinfo{
    width: 100%;
    height: 100%;
    color: #000;
}
</style>
