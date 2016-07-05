var template = require('art-template');

window.onload = function(){
    //元素选择器
    var $ = function($selector){
        return document.querySelector($selector);
    };

    //添加事件监听
    var addEventListener = function(elem, type, callback){
        if(elem.addEventListener){
            elem.addEventListener(type,callback,false);
        }else if(elem.attachEvent){
            elem.attachEvent(type,callback);
        }else{
            elem[''+ type] = callback;
        }
    };

    //加载json数据
    var  loadJSON = function(filepath,callback) {
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

    var tabTable = {
        leftMenuArr:[],
        rightListSource: [],
        config: {},
        init: function(config){
            this.config = config;
            this.leftMenuArr = config.leftMenuArr;
            this.rightListSource = config.rightListSource;

            this.renderView();
            this.bindEvent();
        },

        getActiveAreaInfo:function(){
            var $activeLi = $('.areaMenu').getElementsByClassName('active');
            return  {tag: $activeLi.attr('data-areaTag'),name: $activeLi.text()};

        },
        renderView: function(){
            this.renderLeftMenu();
            this.renderRightDetail();
        },

        renderLeftMenu: function(){
            var leftMenuHtml = template('./h5HistoryTpl/areaMenu',this.leftMenuArr);

            $('.areaMenu').innerHTML = leftMenuHtml;

            if(config.activeTag){
                //添加active elem
                var lis = $('.menuList').children, i;
                for(i =0; i<lis.length ; i++){
                    var $curLi = lis[i];
                    $curLi.className = '';
                    if(config == $curLi.attr('data-tag')){
                        $curLi.className = 'active';
                    }
                }
            }
        },

        renderRightDetail: function(){
            var rightDetaiHtml = template('./h5History/areaDetail', this.rightListSource[this.getActiveAreaName().tag]);

            $('.areaDetail').innerHTML = rightDetaiHtml;

            this.modifyState();
        },

        modifyState: function(){
            var activeAreaInfo = this.getActiveAreaInfo();
            history.pushState({
                title:'上海3月开盘项目汇总-' + activeAreaInfo.name
            },document.title,window.location.pathname + '?area='+activeAreaInfo.tag);
        },
        bindEvent: function(){
            addEventListener('.areaMenu','click',function(event){
                var elem = event.target,
                    activeTag, activeName;
                if(elem.tagName.toLowerCase() == 'li'){
                    var preActive = $('.areaMenu').getElementsByClassName('active');
                    preActive.className = '';

                    elem.className = 'active';

                    this.renderRightDetail();
                }
            })
        }
    };

    var config = {};

    //修改url,进行pushstate操作
    var queryArr= window.location.search.substring(1).split('&');
    if(queryArr.length > 1 || queryArr.length == 0){
        history.pushState({
            title:'上海3月开盘项目汇总-浦东区'
        },document.title,window.location.pathname + '?area=pudong');
    }else{
        config.activeTag = queryArr.split('=')[1];
    }

    loadJSON('./data/data.json',function(response){

    });


    //进行页面的初始化
    tabTable.init(config);
}