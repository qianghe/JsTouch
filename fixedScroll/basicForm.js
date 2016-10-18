/**
 * Created by hq on 16/10/18.
 */
function basicForm() {
}

basicForm.prototype.requestForm = null;
basicForm.prototype.checkFlag = false;
basicForm.prototype.formData = {};
basicForm.prototype.uploadImgsList = [];

basicForm.prototype.init = function(config){
    var self = this;

    self.requestForm = config['form'];

    self.bindEvent();
}

basicForm.prototype.bindEvent = function(){
    console.log('123');
}

function requestForm(){}

requestForm.prototype = new basicForm();
requestForm.prototype.constructor = requestForm;
requestForm.prototype.checkBox = function(){
    var self = this;
    console.log('this',this,this.checkFlag);
    self.checkFlag = true;
    console.log(self.checkFlag);
}

var config = {
    'form': document.querySelector('.refund_request_form')
}
var form = new requestForm();
form.init(config);
form.checkBox();

console.log(form,form.checkFlag);

