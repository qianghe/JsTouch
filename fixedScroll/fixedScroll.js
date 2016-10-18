function addEventListener(elem, type, callback) {
    if (elem.addEventListener) {
        elem.addEventListener(type, callback, false);
    } else if (elem.attachEvent) {
        elem.attachEvent(type, callback);
    } else {
        elem["on" + type] = callback;
    }
}

var $ = function (selector) {
    return document.querySelector(selector);
}

var toArray = function (arr) {
    if (arr) {
        return Array.prototype.slice.call(arr, arguments);
    }
}

window.onload = function () {
    var $body = document.body,
        $unfixed = $('.orderList'),
        $fixed = $('.orderList-fixed'),
        $content = $('.orderListContent'),
        children = $content.children;


    addEventListener(document, 'scroll', function () {
        var curPosTop = $unfixed.offsetTop - $body.scrollTop,
            fixedTop = $fixed.offsetHeight || 0;

        if (curPosTop < 3) {
            $fixed.style.display = 'block';
        } else {
            $fixed.style.display = 'none';
        }

        toArray(children).forEach(function (elem, curIndex) {
            var curStyle = elem.getBoundingClientRect(),
                curHeight = elem.clientHeight,
                scrollLi = null;

            if (curStyle.top - fixedTop < 3 && curStyle.top  > fixedTop-curHeight) {
                if(curIndex != index) {
                    preLi.className = preLi.className.replace(' active', '');
                    scrollLi = $('.orderList-fixed').children[curIndex];
                    scrollLi.className = scrollLi.className + ' active';
                    preLi = scrollLi;
                }
            }
        });
    })


    var preLi = children[0], index = -1;
    addEventListener($fixed, 'click', function (event) {
        var curLi = event.target,
            clickDiv = null,
            fixedTop = $fixed.offsetHeight;

        if (curLi.tagName.toLowerCase() == 'li') {
            if (preLi == curLi && index != -1) return false;

            if (preLi != null) {
                preLi.className = preLi.className.replace(' active', '');
            }

            curLi.className = curLi.className + ' active';
            index = curLi.getAttribute('data-index');
            clickDiv = children[index];

            document.body.scrollTop = clickDiv.getBoundingClientRect().top - fixedTop + document.body.scrollTop;

            preLi = curLi;
        }
    });

    addEventListener($unfixed, 'click', function(event){
        var curLi = event.target,
            index = -1;

        if(curLi.tagName.toLowerCase() == 'li'){
            $fixed.style.display = 'block';
            index = curLi.getAttribute('data-index');
            console.log('index',index);
            $fixed.children[index].click();
        }
    })
}
