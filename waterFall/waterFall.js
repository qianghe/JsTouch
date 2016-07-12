if ( typeof define === "function" && define.amd ) {
    // AMD support

    require(['../commen/Util','../commen/lib/template'], function (util,template) {
        var $ = function ($selector) {
            return document.querySelector($selector);
        };

        var windowWidth = document.body.clientWidth,
            columnNum = 5,
            imgItemWidth , imgItemHeight,
            columnLefts = [],
            columnTops = [];


        init();

        //加载数据
        util.loadJSON('./img.json', function (resp) {
            var imgArray = resp.imgList;

            imgArray.forEach(function(img){
                renderImgItem(img);
            });
        });

        //初始化数据
        function init(){
            imgItemWidth = windowWidth/ columnNum;

            for(var i = 0; i< columnNum ; i++){
                columnLefts[i] = imgItemWidth * (i + 1);
                columnTops[i] = 0;
            }
        }

        //根据数据，获取imgItem信息
        function renderImgItem(img){
            var container = $('.wrapper'),index = 0,
                imgItem,imgItemHtmlStr = '',index = 0;

            imgItem = {
                src: img.src,
                title: img.title
            };
            imgItemHtmlStr = template('imgItem',imgItem);

            container.innerHTML += imgItemHtmlStr;
            index = getMinHeightIndex(columnTops,columnNum);

            container.lastChild.style.top = columnTops[index] + 'px';
            container.lastChild.style.left = columnLefts[index] + 'px';

            columnTops[index] += imgItemHeight;
        }

        //获取数组中的最小值
        function getMinHeightIndex(heightArr,colNum) {
            var  minIndex = 0;
            if (heightArr.length < colNum) {

                while(heightArr[minIndex] != 0){

                    minIndex++;
                }

            }else{

                for(var i = 1; i<heightArr.length ; i++){
                    if(heightArr[i] < heightArr[minIndex]){
                        minIndex = i;
                    }
                }
            }

            return minIndex;
        }

    });

}