define((function(){
    /********************
     * 取窗口滚动条高度
     ******************/
    function getScrollTop()
    {
        var scrollTop=0;
        if(document.documentElement && document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
        }else if(document.body){
            scrollTop=document.body.scrollTop;
        }

        return scrollTop;
    }

    /********************
     * 取窗口可视范围的高度
     *******************/
    function getClientHeight()
    {
        /* 考虑浏览器兼容性
         ** BackCompat：标准兼容模式关闭。浏览器宽度:document.body.clientWidth；
         ** CSS1Compat：标准兼容模式开启。 浏览器宽度:document.documentElement.clientWidth
         */
        var clientHeight=0;
        if(document.compatMode == "CSS1Compat"){
            clientHeight = document.documentElement.clientHeight;
        }else{
            clientHeight = document.body.clientHeight;
        }

        return clientHeight;
    }

    /********************
     * 取文档内容实际高度
     *******************/
    function getScrollHeight()
    {
        return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    }

    return {
        getScrollTop : getScrollTop,
        getClientHeight: getClientHeight,
        getScrollHeight: getScrollHeight
    }
})());