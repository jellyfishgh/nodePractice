const http = require('http');

function sum(a, b) {
    return a + b;
}

const port = 4001;

http.createServer((req, res) => {
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var numbers = body.split('&').map((arg) => {
            return arg.split('=');
        }).map((strs) => {
            return parseInt(strs[1], 10);
        });
        console.log(numbers);
        var total = numbers.reduce(sum, 0);
        res.end(total.toString());
    });
}).listen(port);