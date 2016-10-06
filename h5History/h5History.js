window.onload = function () {
    //元素选择器
    var $ = function ($selector) {
        return document.querySelector($selector);
    };

    //添加事件监听
    var addEventListener = function (elem, type, callback) {
        if (elem.addEventListener) {
            elem.addEventListener(type, callback, false);
        } else if (elem.attachEvent) {
            elem.attachEvent(type, callback);
        } else {
            elem['' + type] = callback;
        }
    };

    //加载json数据
    var loadJSON = function (filepath, callback) {
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

    //替换URL查询参数
    function replaceParam(param, newVal) {
        var url = window.location.href;
        //(&|$)表示之前被匹配的字符串之后是&或者$
        var tmpRegex = new RegExp("(" + param + "=)[a-z]+(&|$)", 'ig');
        return url.replace(tmpRegex, '$1'+ newVal);
    }

    var tabTable = {
        config: {},
        init: function (config) {
            this.config = config;

            this.renderView(false);
            this.bindEvent();
        },

        getActiveAreaInfo: function () {
            var $activeLi = $('.areaMenu').getElementsByClassName('active')[0];
            var name = $activeLi.innerHTML.split('<')[0];
            return {tag: $activeLi.getAttribute('data-areaTag'), name: name};

        },
        renderView: function (flag) {
            this.renderLeftMenu();
            this.renderRightDetail(flag);
        },

        renderLeftMenu: function () {
            var leftMenuHtml = template('areaMenu', this.config.leftMenuArr);

            $('.areaMenu').innerHTML = leftMenuHtml;

            if (config.activeTag) {
                //添加active elem
                var lis = $('.menuList').children, i;
                for (i = 0; i < lis.length; i++) {
                    var $curLi = lis[i];
                    $curLi.className = '';
                    if (config.activeTag == $curLi.getAttribute('data-areatag')) {
                        $curLi.className = 'active';
                        break;
                    }
                }
            }
        },

        renderRightDetail: function (flag) {
            var rightDetaiHtml = template('areaDetail', this.config.rightListSource[this.getActiveAreaInfo().tag]);
            $('.areaDetail').innerHTML = rightDetaiHtml;

            if (flag) this.modifyState();
        },

        modifyState: function () {
            var activeAreaInfo = this.getActiveAreaInfo();
            history.pushState({
                tag: activeAreaInfo.tag
            }, document.title, replaceParam('area',activeAreaInfo.tag));
            console.log(activeAreaInfo.tag);

            document.title = '上海3月开盘项目汇总-' + activeAreaInfo.name;
        },

        bindEvent: function () {
            var that = this;
            addEventListener($('.areaMenu'), 'click', function (event) {
                var elem = event.target,
                    activeTag, activeName;
                if (elem.tagName.toLowerCase() == 'li') {
                    var preActive = $('.areaMenu').getElementsByClassName('active')[0];
                    preActive.className = '';

                    elem.className = 'active';

                    that.renderRightDetail(true);
                }
            })
        }
    };

    var config = {};

    //修改url,进行pushstate操作
    var queryArr = window.location.search.substring(1).split('&');

    if (queryArr.length == 1 && queryArr[0] != "") {
        config.activeTag = queryArr[0].split('=')[1];

    } else {
        history.pushState({
            title: '上海3月开盘项目汇总-浦东',
            tag: 'pudong'
        }, document.title, window.location.search + '?area=pudong');
    }

    //加载JSON文件
    loadJSON('./data.json', function (response) {
        var res = JSON.parse(response);

        config.leftMenuArr = res.leftMenuArr;
        config.rightListSource = res.rightListSource.data[0];

        //进行页面的初始化
        tabTable.init(config);
    });

    //监听浏览器前进／后退及无刷新时的URL
    if (history.pushState) {
        window.addEventListener("popstate", function () {
            tabTable.config.activeTag = history.state.tag;

            tabTable.renderView(false);

            document.title = '上海3月开盘项目汇总-' + history.state.tag;
        });
    }

}