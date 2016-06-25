const http = require('http');

const port = 4001;

http.createServer((req, res) => {
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var number = parseInt(body, 10);
        var squared = Math.pow(number, 2);
        res.end(squared.toString());
    });
}).listen(port);
console.log(`http server listening on ${port}`);