window.onload = function(){
    //基本的JS操作
    var $resultList = document.querySelector('.selectList'),
        $input = document.querySelector('.select'),
        $clearBtn = document.querySelector('.select_clear');
    var work = new Worker('work.js');

    //主线程接受工作线程的数据
    work.onmessage = function(event){
       var resp = event.data;

        $resultList.className =  $resultList.className.replace('hide','');

        $resultList.innerHTML = resp ? resp : 'no result';

    };

    $input.onkeyup = function(){
        work.postMessage($input.value);
        $resultList.innerHTML = '';
    }

    $clearBtn.onclick = function(){
        $input.value = '';
        $resultList.className =  $resultList.className + ' hide';
    }

    document.body.onclick = function(event){
        var $dom = event.target;

        console.log($dom.className,$dom.className.indexOf('select'));
        if($dom.className.indexOf('select') == -1){
            
           $clearBtn.click();
        }
    }

}