<template>
    <div class="userinfo">
        <x-header :left-options="{backText: ''}">个人信息</x-header>
    </div>
</template>
<script>
import {XHeader} from "vux"
export default {
    data(){
        return {

        }
    },
    components:{
        XHeader,
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
