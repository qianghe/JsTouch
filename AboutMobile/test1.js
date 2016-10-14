/**
 * Created by hq on 16/10/14.
 */
var $ = function (selector) {
    return document.querySelector(selector);
};

var addEventListener = function (elem, type, callback) {
    if (elem.addEventListener) {
        elem.addEventListener(type, callback, false);
    } else if (elem.attachEvent) {
        elem.attachEvent(type, callback);
    } else {
        elem['' + type] = callback;
    }
};

var computeAbsolutePos = function ($elem) {
    if (typeof $elem == 'undefined') return false;

    var $body = document.body;
    var win_width = $body.clientWidth,
        win_heigth = $body.clientHeight,
        elem_width = $elem.offsetWidth,
        elem_height = $elem.offsetHeight,
        win_scroll_height = $body.scrollTop;

    $elem.style.top = (window.innerHeight - elem_height) / 2 + win_scroll_height + 'px';
    $elem.style.left = (win_width - elem_width) / 2 + 'px';
}

function ArrayLikeToArray(arrLike){
    return Array.prototype.slice.apply(arrLike,arguments);
}


window.onload = function () {
    var $clickBtn = $('.click_Btn'),
        $cancleBtn = $('.cancel_Btn'),
        $sureBtn = $('.sure_Btn'),
        $closeBtn = $('.popWin_CloseBtn');

    var $mask = $('.mask'),
        $pop_Win = $('.popWin'),
        $wrap = $('.wrap'),
        $ps = document.querySelectorAll('.wrap p');

    addEventListener($clickBtn, 'tap', function (e) {
        console.log(e.target);
        //计算弹窗WIN的位置pos
        $mask.className = $mask.className.replace(/hide/ig, '');
        $pop_Win.className = $pop_Win.className.replace(/hide/ig, '');
        computeAbsolutePos($pop_Win);
    });

    addEventListener($closeBtn, 'touchstart', function (e) {
        $mask.className = $mask.className + ' hide';
        $pop_Win.className = $pop_Win.className + ' hide'
    });

    addEventListener($closeBtn, 'touchend', function (e) {
        e.preventDefault();
        
        $mask.className = $mask.className + ' hide';
        $pop_Win.className = $pop_Win.className + ' hide'
    });

    addEventListener($cancleBtn, 'tap', function () {
        $mask.className = $mask.className + ' hide';
        $pop_Win.className = $pop_Win.className + ' hide'
    });

    addEventListener($wrap,'click',function(){
        console.log('click wrap');
    });

    addEventListener($wrap,'touchstart',function(){
        console.log('wrap touch start');
    });

    addEventListener($wrap,'touchmove',function(){
        console.log('wrap touch mouve');
    });

    addEventListener($wrap,'touchend',function(){
        console.log('wrap touch end');
    });

    addEventListener(document.body,'touchstart',function(){
        console.log('window touch start');
    });

    addEventListener(document.body,'touchmove',function(){
        console.log('window touch move');
    });


    ArrayLikeToArray($ps).forEach(function(item,index){
        addEventListener(item,'touchend',function(){
            console.log('touch p'+index +' end');
        });
        addEventListener(item,'click',function(){
            console.log('click p'+index);
        });
    });

    //滚动时禁止触发touchend
    (function stopTouchendPropagationAfterScroll(){
        var flag = false;
        document.body.addEventListener('touchmove', function(ev){
            flag || (flag = true, document.body.addEventListener('touchend', stopTouchendPropagation, true));
        }, false);

        function stopTouchendPropagation(ev){
            ev.stopPropagation();
            setTimeout(function(){
                window.removeEventListener('touchend', stopTouchendPropagation, true);
                flag = false;
            }, 50);
        }
    })();

}
