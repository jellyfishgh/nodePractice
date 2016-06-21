var fs = require('fs');
var path = require('path');

fs.stat(path.join(__dirname, 'LICENSE'), (err, stats) => {
    if (err) throw err;
    console.log(stats);
});

fs.open(path.join(__dirname, 'LICENSE'), 'r', (err, fd) => {
    if (err) throw err;
    var buffer = new Buffer(5);
    var readBytes = 0;
    (function readIt() {
        fs.read(fd, buffer, readBytes, buffer.length - readBytes, 10 + readBytes, (err, bytesRead, buf) => {
            if (err) throw err;
            console.log(`|-->${buf.toString()}<--|`);
            readBytes += bytesRead;
            if (readBytes === buffer.length) {
                console.log(buffer.toString());
            } else {
                readIt();
            }
        });
    })();
});

fs.open(path.join(__dirname, 'LICENSE'), 'r', (err, fd) => {
    if (err) throw err;
    function readSome(staringAt, byteCount, callback) {
        var buffer = new Buffer(byteCount);
        var readBytes = 0;
        (function readIt() {
            fs.read(fd, buffer, readBytes, buffer.length - readBytes, staringAt + readBytes, (err, bytesRead, buf) => {
                if (err) throw err;
                console.log(`|-->${buf.toString()}<--|`);
                readBytes += bytesRead;
                if (readBytes === buffer.length) {
                    callback(buffer);
                } else {
                    readIt();
                }
            });
        })();
    }
    readSome(5, 4, (buffer) => {
        console.log(buffer.toString());
        readSome(10, 8, (buf) => {
            console.log(buf.toString());
        });
    });
});

fs.open(path.join(__dirname, 'tmp'), 'a', (err, fd) => {
    if (err) throw err;
    // var buffer = new Buffer('abcdefghijklmnopqrstuvwxyz\n');
    var buffer = new Buffer(7);
    var written = 0;
    (function writeIt() {
        fs.write(fd, buffer, 0 + written, buffer.length - written, 10, (err, bytesWritten) => {
            if (err) throw err;
            written += bytesWritten;
            if (written === buffer.length) {
                console.log('done');
            } else {
                writeIt();
            }
        });
    })();
});