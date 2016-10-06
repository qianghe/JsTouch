var nameList = [
    'Alen', 'Buzz', 'Jack',
    'Rose', 'Tom robin', 'Cobina',
    'Time', 'Cherry', 'Oliva', 'Suny bony'
];

var timer = null;
self.onmessage = function (event) {
    var reg = new RegExp(event.data, 'i'),
        html = '',
        pos = 0;

    clearInterval(timer);

    timer = setInterval(function () {
        nameList.slice(pos, (pos += 100)).forEach(function (name) {
            if (reg.test(name))
                html += '<li>' + name + '</li>';
        });

        if (pos >= nameList.length) {
            self.postMessage(html);
            clearInterval(timer);
        }

    }, 0);
}