if ( typeof define === "function" && define.amd ) {
    // AMD support

    require(['../commen/Util','../commen/lib/template','../commen/lib/DocParameter'], function (util,template,docParam) {
        var $ = function ($selector) {
            return document.querySelector($selector);
        };

        var minColumnNum = 3, imgItemWidth = 230,columnNum = 0,
            windowWidth, imgItemWidth , imgItemHeight,
            columnLefts = [], columnTops = [],
            $loading = $('.loading'), $container = $('.wrapper');
            loadFinished = false , reSizing = false;

        init(false);

        //初始化数据
        function init(reflow){
            windowWidth = document.body.clientWidth;
            $document = $container.ownerDocument;
            $window = $document.defaultView || $document.parentWindow;

            columnNum = Math.max(Math.floor((windowWidth - 20) / (imgItemWidth + 20)), minColumnNum);

            for(var i = 0; i< columnNum ; i++){
                columnLefts[i] = imgItemWidth * i;
                columnTops[i] = 0;
            }


            if(!reflow) {
                //加载数据
                loadData(false);

                //绑定各种事件
                bindEvent();
            }
        }

        //绑定事件
        function bindEvent(){
            //1.1滚动条事件监听
             var $document = $container.ownerDocument,
                 resizeTimer = null, scrollTimer = null;

             util.addEventListener($document,'scroll',function() {

                 if (scrollTimer) {
                     clearTimeout(scrollTimer);
                 }

                 scrollTimer = setTimeout(function () {
                     if (docParam.getScrollTop() + docParam.getClientHeight() == docParam.getScrollHeight()) {
                         if (loadFinished && !reSizing) {
                             loadFinished = false;
                             toggleClass($loading);
                             //触发重新加载数据
                             setTimeout(function () {
                                 loadData(true);

                             }, 1000);
                         }
                     }
                 });
             });

            //1.2窗口resize事件监听
            util.addEventListener(window,'resize',function(){
                if (resizeTimer) {
                    clearTimeout(resizeTimer)
                }
                resizeTimer = setTimeout(function(){
                    if(loadFinished) {
                        reSizing = true;
                        var children = $container.children, index = 0;

                        init(true);

                        children = Array.prototype.slice.call(children, 0);


                        children.forEach(function (child) {
                            index = getMinHeightIndex(columnTops);

                            child.style.height = child.offsetHeight + 'px';
                            child.style.left = index * (imgItemWidth + 20) + 'px';
                            child.style.top = columnTops[index] + 'px';
                            columnTops[index] = columnTops[index] + 20 + child.offsetHeight;

                        });

                        $container.height = columnTops[getMaxHeightIndex(index)];
                    }

                    reSizing = false;
                }, 400);
            });
        }

        //加载数据
        function loadData(flag){
            //加载数据
            util.loadJSON('./img.json', function (resp) {
                var imgArray = JSON.parse(resp).imgList;

                imgArray.forEach(function(img){
                    renderImgItem(img);
                });

                $container.style.height = columnTops[getMaxHeightIndex(columnTops, columnNum)] + 'px';
                if(flag)  toggleClass($loading);
                loadFinished = true;
            });

        }

        //根据数据，获取imgItem信息
        function renderImgItem(img){
            var container = $container,index = 0,
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

        //获取数组中的最小值索引
        function getMinHeightIndex( heightArr, colNum ) {
            var  minIndex = 0;

            for( var i = 1; i < heightArr.length ; i++ ){
                if( heightArr[i] < heightArr[minIndex] ){
                        minIndex = i;
                }
            }

            return minIndex;
        }

        //获取数组中的最大值
        function getMaxHeightIndex( heightArr, colNum){
            var maxIndex = 0;

            for( var i = 1; i < heightArr.length ; i++ ){
                if( heightArr[i] > heightArr[maxIndex] ){
                    maxIndex = i;
                }
            }

            return maxIndex;
        }
        //更新className
        function toggleClass($elem){
            var curClassName = $elem.className.indexOf('hide') != -1 ? 'show' : 'hide';
            $elem.className = 'loading '+ curClassName;

        }
    });

}
