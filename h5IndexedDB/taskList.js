if (typeof define === "function" && define.amd) {
    require(['./h5IndexedDB', '../commen/lib/template'], function (h5_DB, template) {
        $(document).ready(function () {

            todoList = {
                $todoList: null,
                allItem : [],

                init: function () {
                    var self = this;
                    this.$todoList = $('.todoList');

                    $.when((function () {
                        var dfd = $.Deferred();

                        h5_DB.openDB('tasksDB', 'taskList', function () {
                            dfd.resolve();
                        });

                        return dfd.promise();

                    }())).done(function () {
                        self.renderAllItemList();
                        self.bindEvent();
                    }).fail(function () {
                        console.log('error');
                    });
                },
                renderTodoItem: function (text) {
                    var todoItemHtml = template('todoListItem', {content: text});
                    this.$todoList.append(todoItemHtml);
                },
                renderAllItemList: function () {
                    var self = this;

                    h5_DB.getAllData(function (text) {
                        self.renderTodoItem(text);
                    });
                },
                bindEvent: function() {
                    var self = this;
                    //添加选项
                    var textarea = $('.inputContent'),
                        $delItem, index;
                    $('.addBtn').bind('click', function () {
                        var inputContent = textarea.val().replace(/^(\s)*|(\s)*$/, '');

                        if (inputContent) {
                            h5_DB.addData({"timeStamp": new Date().getTime(), "title": inputContent});
                            self.renderTodoItem(inputContent);
                        }

                        $('.clearBtn').trigger('click');
                    });

                    //删除选项
                    $('body').on('click','.delItemIcon',  function (e) {
                        $delItem = $(e.target).parent();
                        index = $delItem.index(self.$todoList.children());
                        h5_DB.delData(index + 1);
                        $delItem.remove();
                    });

                    //删除所有选项
                    $('.deleteAllBtn').bind('click', function () {
                        h5_DB.delAllData();
                        self.$todoList.children().remove();
                    });

                    //清除当前填写的内容
                    $('.clearBtn').bind('click', function () {
                        textarea.val('');
                    })

                }
            }

            todoList.init();

        });

    });
}