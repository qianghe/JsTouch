if ( typeof define === "function" && define.amd ) {
    // AMD support

    require(['../commen/Util','../commen/lib/template'], function (util,template) {
        var $ = function ($selector) {
            return document.querySelector($selector);
            document.getElementsByClassName()
        };

        var windowWidth = document.body.clientWidth - 20,
            columnNum = 5,
            imgItemWidth , imgItemHeight,
            columnLefts = [], columnTops = [],
            $document, $window;


        init();


        //初始化数据
        function init(){
            imgItemWidth = windowWidth/ columnNum;

            for(var i = 0; i< columnNum ; i++){
                columnLefts[i] = imgItemWidth * i;
                columnTops[i] = 0;
            }

            //初始化window及document对象
            

            //加载数据
            loadData();

            //绑定各种事件
            bindEvent();
        }

        //绑定事件
        function bindEvent(){
            //1.1滚动条事件监听
             util.addEventListener($(window),'scroll',function(){
                 if($(window).scrollTop() + $(window).height() == $(document).height()) {
                     alert("bottom!");
                 }
             });
            //1.2窗口resize事件监听
        }

        //加载数据
        function loadData(){
            //加载数据
            util.loadJSON('./img.json', function (resp) {
                var imgArray = JSON.parse(resp).imgList;

                imgArray.forEach(function(img){
                    renderImgItem(img);
                });
            });

        }

        //根据数据，获取imgItem信息
        function renderImgItem(img){
            var container = $('.wrapper'),index = 0,
                imgItem,imgItemHtmlStr = '', nodeStyle;

            imgItem = {
                "imgItem": {
                src: img.src,
                title: img.title
                }
            };
            imgItemHtmlStr = template('imgItem',imgItem);

            container.innerHTML += imgItemHtmlStr;
            index = getMinHeightIndex(columnTops,columnNum);

            nodeStyle = container.lastChild.style;

            nodeStyle.height = img.height + 20 + 'px';
            nodeStyle.width = imgItemWidth + 'px';
            nodeStyle.top = columnTops[index] + 'px';
            nodeStyle.left = columnLefts[index] + 'px';

            columnTops[index] += img.height + 20;
        }

        //获取数组中的最小值
        function getMinHeightIndex( heightArr, colNum ) {
            var  minIndex = 0;

            for( var i = 1; i < heightArr.length ; i++ ){
                if( heightArr[i] < heightArr[minIndex] ){
                        minIndex = i;
                }
            }

            return minIndex;
        }

    });

}