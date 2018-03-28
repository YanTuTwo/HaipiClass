function sendForm() {
	var process = document.getElementsByTagName('div')[0];
	var file = formAll.children[2].files[0];
	var size = file.size;
	var name = file.name;
	var shardSize = 2 * 1024 * 1024;
	var total = Math.ceil(size / shardSize);
	var successed = 0;
	var un = document.getElementsByTagName('input')[0];
	var pw = document.getElementsByTagName('input')[1];
	for(var i = 0; i < total; i++) {
		var start = i * shardSize;
		var end = (i + 1) * shardSize > size ? size : (i + 1) * shardSize;
		var form = new FormData();
		form.append('name', name);
		form.append('total', total);
		form.append('data', file.slice(start, end));
		form.append('index', i);
		form.append('un', un.value);
		form.append('pw', pw.value);
		var xhr = new XMLHttpRequest();
		xhr.open('post', 'http://192.168.1.14:3000/upload/upvideo');
		xhr.send(form);
		xhr.onload = function() {
			++successed;
			console.log(successed);
			process.style.width = (successed / total) * 100 + "%";
		}
	}
}
var formAll = document.getElementsByTagName('form')[0];
var uploadBtn =  document.getElementById('btn');
uploadBtn.onclick = sendForm;