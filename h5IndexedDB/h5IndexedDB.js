define(function () {
//浏览器对于关系数据库的支持并为统一,仍需添加提供商的前缀
//获取关系数据库
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//获取关系数据库的事务
        var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
//获取关系数据库索引范围
        var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


        var version = 1.0,
            db = null,
            tableName = '';

        function errorLog(e) {
            console.debug(e);
        };

        //版本升级时触发
        function upgradeneeded(event) {
            db = event.target.result;

            if (!db.objectStoreNames.contains(tableName)) {
                var store = db.createObjectStore(tableName, {
                    keyPath: '_id',
                    autoIncrement: true
                });
            }


        };

        function _openDB(databaseName, tablename, callback) {
            var request = indexedDB.open(databaseName, version);

            tableName = tablename;

            request.onsuccess = function (event) {
                console.log('链接数据库成功');
                //创建数据表格
                db = event.target.result;

                if (!db.objectStoreNames.contains(tablename)) {
                    var store = db.createObjectStore(tableName, {
                        keyPath: '_id',
                        autoIncrement: true
                    });
                }

                if(callback instanceof  Function){
                    callback();
                }
            }

            //版本升级时触发
            request.onupgradeneeded = upgradeneeded;

            request.onerror = errorLog;

            return true;

        };

        function _addData(data) {
            var transaction = db.transaction([tableName], "readwrite");
            var request = transaction.objectStore(tableName).put(data);

            request.onsuccess = function (event) {
                var key = event.target.result;

                console.log('add success !  ke->', key);
            }
        };

        function getData(key) {
            var transaction = db.transaction([tableName]);
            var request = transaction.objectStore[tableName].get(key);

            request.onsuccess = function (event) {
                var data = event.target.result;

                console.log('get success !  ke->', data);
            }
        };

        function _delData(key) {
            var transaction = db.transaction([tableName], 'readwrite');
            var request = transaction.objectStore(tableName).delete(key);

            request.onsuccess = function (event) {
                var data = event.target.result;

                console.log('delete success !  key->', data);
            }
        };

        function _getAllData(callback){
            var store = db.transaction([tableName]).objectStore(tableName);
            var allDataArr = [];

            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange); //开启索引为0的表

            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;

                if ( !! result == false) return;
                callback(result.value.title);

                result.continue (); //这边执行轮询读取
            };

            cursorRequest.onerror = errorLog;
        };

        function _delAllData(){
            var store = db.transaction([tableName],'readwrite').objectStore(tableName);

            var objectStoreRequest = store.clear();

            objectStoreRequest.onsuccess = function(event) {
                // report the success of our clear operation
                console.log('clearAll');
            };
        };

        return {
            openDB: _openDB,
            addData: _addData,
            delData: _delData,
            getAllData: _getAllData,
            delAllData: _delAllData,
        }

    }
);



