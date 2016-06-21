const path = require('path');
const fs = require('fs');
const http = require('http');

const port = 9000;

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
console.log('http server is listening on port: ' + port);