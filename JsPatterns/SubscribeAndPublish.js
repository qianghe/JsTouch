/*
 * 发布者-订阅者模式
 * 发布者发布事件,订阅者订阅事件\取消订阅
 * */

var Event = (function(){
    var clientFunc = [],
        subscribe,
        publish,
        remove;

    subscribe = function(key ,callback){
        if(!clientFunc[key]){
            clientFunc[key] = [];
        }

        clientFunc[key].push(callback);
    };

    publish = function(){
        var key = Array.prototype.shift.call(arguments),
            _self = this;

        clientFunc[key].forEach(function(func){
            func.apply(_self, arguments);
        })
    };


    remove = function(key,fn){
        if(!clientFunc[key]) return false;

        if(!fn){
            clientFunc[key] = [];
        }else{
            clientFunc[key].filter(function(func){
                if(func == fn) return false;
            });
        }
    };

    return {
        subscribe: subscribe,
        publish : publish,
        remove : remove
    }
})();