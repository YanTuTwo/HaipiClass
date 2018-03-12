<template>   
     
    <div class="login">        
        <div class="login-logo"><img src="../../assets/image/logo.png" alt=""></div>
        <div class="form">
            <p><span class="iconfont icon-yonghu"></span><input type="text" placeholder="用户名" v-model="userid"></p>
            <p><span class="iconfont icon-mima54"></span><input type="password" placeholder="请输入您的密码" v-model="password"></p>
            <p>
                <x-button :gradients="['#55ccff', '#2e97fb']" class="loginbtn" @click.native="checkLogin">登录</x-button>
                <x-button :gradients="['#55ccff', '#2e97fb']" class="loginbtn"  @click.native="nologin">暂不登录</x-button>
            </p>
            <!-- <input type="button"> -->
            <p class="changepassword">
                忘记密码?
                <i @click="onRegister">新用户注册</i>
            </p>
        </div> 
        <transition name="fade">
            <div class="register" v-if="showRegister">
                <div class="register-form">
                    <group title="*用户名必须以字母开头 + 数字/字母/下划线">        
                        <x-input title="用户名" name="username" placeholder="请输入用户名"  :is-type="itUsername"  :required='true' v-model="registeruser"></x-input>       
                        <x-input title="昵称" name="username" placeholder="嗨皮"  :max='10'  :required='true' v-model="nickname"></x-input>                
                    </group>
                    <group title="*密码必须由4-16位的数字或字母组成">
                        <x-input title="密码" type="password" placeholder="请输入密码" :is-type="itPwd" v-model="password1" :max='16' :required='true'></x-input>
                        <x-input title="确认密码" type="password" placeholder="请确认密码" v-model="password2" :equal-with="password1" :max='16' :required='true'></x-input>
                    </group>
                    <group>
                        <x-button @click.native="registerbtn" type="primary">注册</x-button>
                    </group> 
                    <div class="closeRegister">
                        <span class="iconfont icon-2guanbi" @click="showRegister=false"></span>
                    </div>
                </div>
            </div>    
        </transition>        
    </div>
</template>
<script>
import Vue from "vue";
import {XButton,Group,XInput,ToastPlugin} from "vux";
Vue.use(ToastPlugin);
import {mapMutations} from "vuex";
import axios from "axios";
export default {
    data(){
        return {
            showRegister:false,
            //登录
            password:'',
            userid:'',
            //注册
            registeruser:'',
            nickname:'',
            password1:'',
            password2:'',
            itUsername:function(value){
                var reg=/^[A-Za-z][A-Za-z1-9_-]+$/;
                return {
                    valid: reg.test(value) == true,
                    msg: '用户名格式不正确'
                }
            },
            itPwd:function(value){
                var reg= /^[a-zA-Z0-9]{4,16}$/;

                return {
                    valid: reg.test(value) == true,
                    msg: '密码格式不正确'
                }
            },
            //验证
            checkPass:false,
            
        }
    },
    components:{
        XButton,
        Group,
        XInput
    },
    methods:{
        onRegister(){
            this.showRegister=true;
        },
        checkLogin(){
            if(this.userid.trim()=="" || this.password.trim()==""){
                this.$vux.toast.text('账号或密码不能为空', 'bottom');
                return false;
            }
            // console.log("发请求"+this.userid+"和"+this.password);
            axios.post("/api/users/login",{
                userid:this.userid,
                password:this.password,      
            }).then((res)=>{
                // console.log(res.data);
                if(res.data.code){
                    this.$vux.toast.text('登录成功', 'bottom');
                    window.localStorage.setItem("userid",this.userid);
                    window.localStorage.setItem("password",this.password);
                    this.SET_LOGINSTATUS(true);
                    this.$router.push({path:'index/recommend'});
                }else{
                    this.$vux.toast.text('账号或密码不正确', 'bottom');
                }
            })
        },
        nologin(){
            this.$router.back(-1);
        },
        registerbtn(){
            var usernamereg=/^[A-Za-z][A-Za-z1-9_-]+$/;
            var pwdreg=/^[a-zA-Z0-9]{4,16}$/;
            if(usernamereg.test(this.registeruser) && pwdreg.test(this.password1) && this.password1==this.password2 && this.nickname!=''){
                axios.post('/api/users/register',{
                    userid:this.registeruser,
                    username:this.nickname,
                    password:this.password1,
                }).then((res)=>{
                    if(res.data.code){
                        this.userid=this.registeruser;
                        this.$vux.toast.text('注册成功', 'middle');
                        this.showRegister=false;
                        this.registeruser="";
                        this.nickname="";
                        this.password1="";
                        this.password2="";                        
                    }else{
                        this.$vux.toast.text('注册失败！请稍后再试', 'middle');
                    }

                })
            }else{
                this.$vux.toast.text('格式不正确！', 'middle');
            }
            
        },
        ...mapMutations([
			'SET_LOGINSTATUS'
		])
    }
}
</script>
<style lang="scss" scoped>
.login{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:url("../../assets/image/9.jpg");
    background-position: center center;
    background-size:cover;
    overflow: hidden;
    .login-logo{
        width: 16rem;
        margin: 4rem auto;
        // height: 6rem;
        img{
            width: 100%;
        }
    }
    .form{
        p{
            padding: 0 3rem;
            position: relative;
            span{
                position: absolute;
                top: 0;
                left: 4rem;
                color: #fff;
                line-height: 3rem;
                font-size: 2rem;
            }
        }
        .changepassword{
            padding: 0 2.4rem;
            margin-top: 0.8rem;
            font-size: 1rem;
            color: #fff;
            i{
                float: right;
            }
        }
        input{
            font-size: 1rem;
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            // border-radius: 1.5rem;
            padding-left: 4rem;
            margin-bottom: 2rem;
            outline: none;
            border:none;
            border-bottom: 1px solid #fff;
            background: transparent;
            color: #fff;
            // box-shadow: 2px 5px 10px 2px #dcf0fc;
        }
        input::-webkit-input-placeholder{
            color:#fff;
        }
        
    }
    .loginbtn{
        // margin-top: 2rem;
        // opacity: 0.8;
        height: 3rem;
        border-radius: 1.5rem;
        background: #fff;
        color: #55ccff
    }
    .register{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;        
        z-index: 1;
        background: rgba($color: #000000, $alpha: .5);     
        overflow: hidden;
        .register-form{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80%;
            // height: 58%;
            background: #fff;
            transform:translate(-50%, -50%);
            overflow: hidden;
            border-radius: 5%;
            padding: 2rem 1rem;
            .closeRegister{
                text-align: center;
                margin-top: 2rem;
                span{
                    font-size: 2rem;
                    color: #666;
                }
            }
        }
        
    }
    .fade-enter-active, .fade-leave-active{
        transition: all 0.5s ease  
    }          
    .fade-enter, .fade-leave-active{
        height: 0;
        opacity: 0;
    }
    
}
</style>
