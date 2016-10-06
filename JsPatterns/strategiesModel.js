//策略模式:封装多个算法,供context环境调用
//以提交FORM表单为例子来进行策略模式的调用
var strategies = {
    isNonEmpty: function (value, errorMsg) {
        if (value.replace(/^\s+|\s+$/i, '') == '')
            return errorMsg;
    },
    minLength: function (value, length, errorMsg) {
        if (value.length < length)
            return errorMsg;
    },
    isMobile: function (value, errorMsg) {
        if (!/^1[3|5|8][0-9]{9}]/.test(value))
            return errorMsg;
    }
}

var Validator = function () {
    this.cache = [];
}

Validator.prototype.add = function (dom, rules) {
    var self = this, rule;

    for (var i = 0; i < rules.length; ) {
        rule = rules[i++];

        (function (rule) {
            var strategyArr = rule.strategy.split(':');
            var errorMsg = rule.errorMsg;

            self.cache.push(function () {
                var strategy = strategyArr.shift();
                strategyArr.unshift(dom.value);
                strategyArr.push(errorMsg);

                return strategies[strategy].apply(dom, strategyArr);
            })
        })(rule);
    }
}


Validator.prototype.start = function () {
    var validatorFunc = null;

    for(var i = 0 ; i< this.cache.length ; ){
        validatorFunc = this.cache[i++]
        var errorMsg = validatorFunc();
        if(errorMsg){
            return errorMsg;
        }
    }
}



