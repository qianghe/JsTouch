/**
 * dom support the function insertBefore:
 *
 * parentElem.insertBefore(newElem,targetElem)
 *
 * There is no function named insertAfter,so you have to realize it yourself.
 *
 */

function insertAfter(newElem, targetElem, parentElem) {
    var childrenNodes = parentElem.childrenNode(),
        _this = Array.prototype.shift.call(arguments);

    childrenNodes = childrenNodes.filter(function (node) {
        if (node.nodeType == 1) return true;
    });

    for (var i = 0; i < childrenNodes.length; i++) {
        if (childrenNodes[i] == targetElem) break;
    }

    if (i == 0 || i == childrenNodes.length) {
        parentElem.appendChild(newElem);
    } else {
        childrenNodes[i].insertBefore.apply(_this, arguments);
    }
}

/**
 *  function write by js dom
 */

function insertAfter(newElem, targetElem) {
    var parentNode = targetElem.parentNode;

    if (parentNode.lastChild == targetElem) {
        parentNode.appendChild(newElem);
    } else {
        parent.insertBefore(newElem, targetElem.nextSibling);
    }
}


/**
 * something change with onload function
 *
 * if you have more than one function may excute after doc load ,
 * then you
 *
 */
function addLoadEvent(newEvent) {
    var oldLoadEvent = window.onload;

    if (typeof window.onload != 'function') {
        window.onload = newEvent;
    } else {
        window.onload = function () {
            oldLoadEvent();
            newEvent();
        }
    }
}


/**
 * js-ajax-xmlHttpRequest
 *
 * as IE and other browser realize the ajax function is different,
 * so we have to package the realize function to deal with the cross-browser.
 */
function getXHRObject() {
    //IE different version compatible
    if (typeof XMLHttpRequest == 'undefined') {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        }catch(e){}

        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        }catch(e){}

        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }catch(e){}
    }

    return new XMLHttpRequest();
}

/**
 *  XMLHttpRequest function work
 */
function ajaxDo(){
    var xhr = getXHRObject();

    if(xhr){
        xhr.open('get','',true);
        xhr.onreadystatechange= function(){
            if(xhr.readyState == 4){
                //request is deal ,response is return
                var response = xhr.response;
                // do something with the response data

            }
        }
    }
}


/**
 *
 * share mode
 */

var toolTipFactory = (function(){
    var toolTipPool = [];
    var createArrFlag = false;

    return {
        create:function(){
            createArrFlag = true;
            if(createArrFlag == true){
                var tooltip = document.createElement('div');
                document.body.appendChild(tooltip);
                toolTipPool.push(tooltip);
                return tooltip;
            }else {
                return toolTipPool.shift();
            }
        },
        recover: function(toolTipDom){
            createArrFlag = false;
            return toolTipPool.push(toolTipDom);
        }
    }
})();


/**
 * decoration mode: not change the obj itself
 * example: aop decoration function
 */
Function.prototype.before = function(beforefn){
    var _self = this;

    return function(){
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
}

Function.prototype.after = function(afterfn){
    var _self = this;

    return function(){
        var ret = _self.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    }
}
