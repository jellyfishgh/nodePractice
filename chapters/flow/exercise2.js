const fs = require('fs');
const path = require('path');

function doWhatWasAsked(cb) {
    var aFd, bFd, buffer = new Buffer(10);

    function openA() {
        fs.open(path.join(__dirname, 'a.txt'), 'r', readFromA);
    }

    function readFromA(err, fd) {
        if (err) {
            cb(err);
            return;
        }
        aFd = fd;
        fs.read(aFd, buffer, 0, buffer.length, 0, openB);
    }

    function openB(err) {
        if (err) {
            cb(err);
            return;
        }
        fs.open(path.join(__dirname, 'b.txt'), 'a', statB);
    }

    function statB(err, fd) {
        if (err) {
            cb(err);
            return;
        }
        bFd = fd;
        fs.fstat(bFd, writeB);
    }

    function writeB(err, bStats) {
        if (err) {
            cb(err);
            return;
        }
        fs.write(bFd, buffer, 0, buffer.length, bStats.size, cb);
    }
    openA();
}

console.log('starting...');
doWhatWasAsked((err) => {
    if (err) throw err;
    console.log('done');
});