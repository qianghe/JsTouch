define(function(){
    //添加事件监听
    function addEventListener(elem, type, callback) {
        if (elem.addEventListener) {
            elem.addEventListener(type, callback, false);
        } else if (elem.attachEvent) {
            elem.attachEvent(type, callback);
        } else {
            elem['' + type] = callback;
        }
    };

    //加载json数据
    function loadJSON(filepath, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', filepath, true); // Replace 'my_data' with the path to your file

        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    };

    return {
        addEventListener: addEventListener,
        loadJSON: loadJSON
    }
});