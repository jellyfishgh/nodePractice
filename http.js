const path = require('path');
const fs = require('fs');
const http = require('http');

const server = {
    start1: function (port) {
        http.createServer((req, res) => {
            var file = path.join('.', path.normalize(req.url));
            fs.stat(file, (err, stats) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Not Found');
                } else {
                    if (stats.isDirectory()) {
                        res.writeHead(403);
                        res.end('Forbidden');
                    } else if (stats.isFile()) {
                        res.writeHead(200);
                        fs.createReadStream(file).pipe(res);
                    }
                }
            });
        }).listen(port);
        console.log('server start1 is listening at port: ' + port);
    },
    start2: function (port) {
        http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
            var left = 10;
            var interval = setInterval(() => {
                for (var i = 0; i < 100; i++) {
                    res.write(new Date().toLocaleString() + '\n');
                }
                if (--left === 0) {
                    clearInterval(interval);
                    res.end();
                }
            }, 1000);
        }).listen(port);
        console.log('server start2 is listening at port: ' + port);
    },
    start3: function (port) {
        var sequence = 0;
        http.createServer((req, res) => {
            var fileName = 'tmp';
            var writeStream = fs.createWriteStream(fileName);
            req.pipe(writeStream);
            req.on('data', (data) => {
                console.log(`${data.length}`);
            });
            req.on('end', () => {
                res.writeHead('200', { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end('ha ha');
            });
            sequence++;
        }).listen(port);
        console.log("server start3 is listening at port: " + port);
    }
}

var port = 9000;
var type = process.argv.slice(2)[0];
if (!type) type = 'start1';

server[type](port);