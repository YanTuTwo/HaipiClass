<template>
    <transition appear name='fade' mode="out-in">
    <div class="login">
        
        <div class="login-logo"><img src="../../assets/image/logo.png" alt=""></div>
        <div class="form">
            <p><span class="iconfont icon-yonghu"></span><input type="text" placeholder="用户名"></p>
            <p><span class="iconfont icon-mima54"></span><input type="password" placeholder="请输入您的密码"></p>
            <p><x-button :gradients="['#55ccff', '#2e97fb']" class="loginbtn">登录</x-button></p>
            <!-- <input type="button"> -->
            <p class="changepassword">
                忘记密码?
                <i>新用户注册</i>
            </p>
        </div>       
    </div>
    </transition>
</template>
<script>
import {XButton} from "vux";
export default {
    data(){
        return {

        }
    },
    components:{
        XButton,
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
            padding: 0 2rem;
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
}
</style>
