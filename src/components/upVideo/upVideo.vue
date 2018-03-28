<template>
    <div>
        <x-header :left-options="{backText: ''}">上传视频</x-header>
        <label for="file"><span class="iconfont icon-icons01"></span>上传视频</label>
        <input type="file" id="file" @change="getFile($event)" style="display: none;">
        <input type="button" value="上传" id="btn" @click="upload">
        <!-- <form>

			<input type="file" name="file">
			
			<div></div>
		</form> -->
    </div>
</template>
<script>
import {XHeader,Scroller,ConfirmPlugin,ToastPlugin} from 'vux'
// import "./index"
export default {
    data(){
        return {
            file:'',
        }
    },
    components:{
        XHeader
    },
    methods:{
        getFile(event){
            this.file=event.target.files[0];
             console.log(this.file);
        },
        upload(){
            var process = document.getElementsByTagName('div')[0];
            var size = this.file.size;
            var name = this.file.name;
            var shardSize = 2 * 1024 * 1024;
            var total = Math.ceil(size / shardSize);
            var successed = 0;
            for(var i = 0; i < total; i++) {
                var start = i * shardSize;
                var end = (i + 1) * shardSize > size ? size : (i + 1) * shardSize;
                var form = new FormData();
                form.append('name', name);
                form.append('total', total);
                form.append('data', this.file.slice(start, end));
                form.append('index', i);
                var xhr = new XMLHttpRequest();
                xhr.open('post', 'http://193.112.95.221:9999/upload/upvideo');
                xhr.send(form);
                xhr.onload = function() {
                    ++successed;
                    console.log(successed);
                    process.style.width = (successed / total) * 100 + "%";
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
