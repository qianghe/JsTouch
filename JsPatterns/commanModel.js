//命令模式
//命令模式使请求发送者和请求接受者之间的耦合关系降低了,例子如下
var Ryu = {
    attact: function () {
        console.log('袭击');
    },
    defense: function () {
        console.log('防御');
    },
    jump: function () {
        console.log('跳跃');
    },
    crouch: function () {
        console.log('蹲下');
    }
}

var commands = {
   "119": "jump",
    "115": "crouch",
    "97": "defense",
    "100": "attack"
};

var makeCommand = function(receiver,state){
    return function(){
        receiver[state]();
    }
}
//命令保存栈
var commandStack = [];

document.onkeypress  = function(e){
    var keyCode = e.keyCode,
        command = makeCommand(Ryu,keyCode);

    if(command){
        command();
        commandStack.push(command);
    }
}
//重新执行一系列的操作
document.getElementById('replay').onclick = function(){
    var command;
    while( command = commandStack.shift()){
        command();
    }
}