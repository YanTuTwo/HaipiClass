<template>   
     
    <div class="login">        
        <div class="login-logo"><img src="../../assets/image/logo.png" alt=""></div>
        <div class="form">
            <p><span class="iconfont icon-yonghu"></span><input type="text" placeholder="用户名"></p>
            <p><span class="iconfont icon-mima54"></span><input type="password" placeholder="请输入您的密码"></p>
            <p><x-button :gradients="['#55ccff', '#2e97fb']" class="loginbtn">登录</x-button></p>
            <!-- <input type="button"> -->
            <p class="changepassword">
                忘记密码?
                <i @click="onRegister">新用户注册</i>
            </p>
        </div> 
        <transition name="fade">
            <div class="register" v-if="showRegister">
                <div class="register-form">
                    <group title="">
                        <x-input title="用户名" name="username" placeholder="请输入用户名" is-type="china-name"></x-input>
                        <x-input title="密码" name="username" placeholder="请输入密码" is-type="china-name"></x-input>
                        <x-input title="确认密码" name="username" placeholder="请确认密码" is-type="china-name"></x-input>

                    </group>
                </div>
            </div>    
        </transition>        
    </div>
</template>
<script>
import {XButton,Group,XInput} from "vux";
export default {
    data(){
        return {
            showRegister:false,
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
        }
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
                left: 3rem;
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
        .register-form{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80%;
            height: 60%;
            background: #fff;
            transform:translate(-50%, -50%);
            border-radius: 5%;
        }
    }
    .fade-enter-active, .fade-leave-active{
        transition: all 0.5s ease  
    }          
    .fade-enter, .fade-leave-active{
        width: 0;
        opacity: 0;
    }
    
}
</style>
