//代理模式
//实例:图片预加载功能
//创建图片IMG元素
var myImage = (function () {
    var imgNode = document.createElement('img');
    imgNode.className = 'imgNode';
    document.body.appendChild(imgNode);

    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();

//代理加载图片的代理模式,预加载:loading图片
var proxyImage = (function () {
    var img = new Image();
    img.onload = function () {
        myImage.setSrc(this.src);
    }

    return {
        setSrc: function(src){
            myImage.setSrc('./imgs/loading.gif');
            img.src = src;
        }
    }
})();

proxyImage.setSrc('http://img65.ybzhan.cn/9/20150530/635685821669712516379.jpg');