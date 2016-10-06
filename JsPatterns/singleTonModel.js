//单例模式
//应用: 线程池,window变量
//此单例模式方法将创建对象和管理单例分开进行
var getSingle = function(fn){
    var result = null;

    return function(){
        return result || (result=fn.apply(this,arguments));
    }
}

//创造登录窗口,除了用于单例模式,可以很好的进行多个登录窗口的创立
function createLoginLayer(){
    var div = document.createElement('div');
    div.innerHTML = 'Login Frame';
    div.style.display = 'none';
    document.body.appendChild(div);

    return div;
}
//使用单例模式创造一个单例的登录窗口
var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function(){
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}