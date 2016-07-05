function foo(param){
    var count = 0,that = this;

    console.log(param);
    return {
        decrement: function () {
            that.count--;
        },
        increment: function () {
            that.count++;
        },
        getCount: function () {
            return that.count;
        }
    };
}

for(var i =0; i<5;i++){
    foo(i);
    foo.increment();
}

console.log(foo.getCount());