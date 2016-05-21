window.onload = function(){

    //定义获取dom元素的简易符号
    var $ = function(selector){
        return document.querySelector(selector);
    };

    //事件监听-兼容
    var addEvent = function(elem,type,callback){
        if(elem.addEventListener){
            elem.addEventListener(type,callback,false);
        }else if(elem.attachEvent){
            elem.attachEvent(type,callback);
        }else{
            elem['on'+type] = callback;
        }
    };

    //配置分数对应信息
    var info = {
        "1":[
            "1分 很不满意",
            "差得太离谱，与卖家描述的严重不符，非常不满"
        ],
        "2":[
            "2分 不满意",
            "部分有破损，与卖家描述的不符，不满意"
        ],
        "3":[
            "3分 一般",
            "质量一般，没有卖家描述的那么好"
        ],
        "4":[
            "4分 满意",
            "质量不错，与卖家描述的基本一致，还是挺满意的"
        ],
        "5":[
            "5分 非常满意",
            "质量非常好，与卖家描述的完全一致，非常满意"
        ]
    };

    var ul = $('.starList'),
        result = $('.resultShow'),
        tip = $('.tips'),tipScore = $('.tip-score'),tipDesc = $('.tip-describe');
    //操作：1.hover时,li类型变化及tip的提示
    /*addEvent(ul, 'mouseover', function(event){
        var target = event.target, num,i ;

        if(target.tagName.toLowerCase() == 'li'){
            num = parseInt(target.innerText);

            for(i =0; i<num ; i++){
                ul.children[i].className = 'select';
            }

            tip.style.left = target.clientX - tip.offsetWidth /2;
            tip.style.top = target.clientY;
            tip.className = 'show';
        }
    });


    addEvent(ul, 'mouseleave', function(){
        var target = event.target, num,i ;

        if(target.tagName.toLowerCase() == 'li'){
            num = parseInt(target.innerText);

            for(i =0; i<num ; i++){
                ul.children[i].className = '';
            }

            tip.className = 'hide';
        }
    });*/

    ['mouseover','mouseout','click'].forEach(function(type, index){
        addEvent(ul,type,function() {
            var target = event.target, num, i, firstVisited = false,
                liClassName = type == 'mouseleave' ? '' : 'selected';


            if (target.tagName.toLowerCase() == 'li') {
                num = parseInt(target.innerText);

                for (i = 0; i < ul.children.length; i++) {
                   if(i<num) ul.children[i].className = liClassName;
                    else ul.children[i].className = '';
                }

                if (type == 'mouseover') {
                    tip.style.left = target.offsetLeft -  114 + 'px';
                    tip.style.top  = target.offsetTop  + 35 + 'px';
                    tip.innerHTML = ' <p class="tips-score">'+info[""+num][0]+'</p>' + info[""+num][1];
                    tip.className = 'tips show';
                }else if(type == 'mouseout'){
                    tip.className = 'tips hide';
                    if(!firstVisited) {
                        for (i = 0; i < ul.children.length; i++) {
                            ul.children[i].className = '';
                        }
                    }
                }else{
                    tip.className = 'tips hide';
                    result.innerHTML = ' <span class="num">'+info[""+num][0]+'分</span> ' +
                        '(' +info[""+num][1]+')';
                    result.className = 'resultShow show';
                    firstVisited = true;
                }

            }
        });
    });
};