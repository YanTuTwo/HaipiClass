<template>
    <div>
        <x-header :left-options="{backText: ''}">上传视频</x-header>
        <form>
			<input type="text" name="username" placeholder="用户名">
			<input type="password" name="password" placeholder="密码">
			<input type="file" name="file">
			<input type="button" value="上传" id="btn">
			<div></div>
		</form>
    </div>
</template>
<script>
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin} from 'vux'
import "./index"
export default {
    components:{
        XHeader
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>

</style>
