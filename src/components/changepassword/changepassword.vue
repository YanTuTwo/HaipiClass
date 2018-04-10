<template>
    <div class="changepassword">
        <x-header :left-options="{backText: ''}" >修改密码</x-header>
        <group title="*密码必须由4-16位的数字或字母组成">       
            <x-input title="原密码：" type="text" v-model="oldpassword"></x-input>
        </group>
        <group >
            <x-input title="密码" type="password" placeholder="请输入密码" :is-type="itPwd" v-model="newpassword" :max='16' :required='true'></x-input>
            <x-input title="确认密码" type="password" placeholder="请确认密码" v-model="newpassword2" :equal-with="newpassword" :max='16' :required='true'></x-input>
        </group>
        <div class="saveBtn">
            <x-button @click.native="saveBtn" type="primary">修改</x-button>
        </div> 
    </div>
</template>
<script>
import Vue from "vue";
import {mapMutations} from "vuex";
import {XHeader,XInput,Group,XButton,XTextarea,PopupRadio,Range,Cell,Radio,ToastPlugin,Confirm,Loading,Actionsheet} from "vux";
Vue.use(ToastPlugin);
import axios from 'axios';
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            oldpassword:"",
            newpassword:"",
            newpassword2:"",
            itPwd:function(value){
                var reg= /^[a-zA-Z0-9]{4,16}$/;

                return {
                    valid: reg.test(value) == true,
                    msg: '密码格式不正确'
                }
            },
        }
    },
    components:{
        Group,XInput,XHeader,XButton
    },
    methods:{
        change(){

        },
        saveBtn(){
            if(this.oldpassword.trim()=="" || this.newpassword.trim()=="" || this.newpassword2.trim()==""){
                this.$vux.toast.text('请填写完整！', 'bottom');
                return false;
            }
            if(this.newpassword!=this.newpassword2){
                this.$vux.toast.text('两次输入的新密码不同！', 'bottom');
                return false;
            }
            axios.post("/api/users/changepassword",{
                userid:window.localStorage.getItem('userid'),
                oldpassword:this.oldpassword,
                newpassword:this.newpassword,
            }).then((res)=>{
                if(res.data.code){
                    this.$vux.toast.text(res.data.msg, 'middle');
                    var self=this;
                    setTimeout(function(){
                        
                        self.SET_LOGINSTATUS(false);
                        window.localStorage.clear();
                        self.$router.push({path:"/login"});
                    },2000)
                }else{
                    this.$vux.toast.text(res.data.msg, 'middle');
                }
                
            })
        },
        ...mapMutations([
            'SET_LOGINSTATUS'
        ]),
    },
    
}
</script>
<style lang="scss" scoped>
.saveBtn{
    padding: 1rem;
}
</style>
