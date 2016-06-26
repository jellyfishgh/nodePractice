const fs = require('fs');
const path = require('path');
const Step = require('step');

function doWhatWasAsked(cb) {
    var aFd, bFd, buffer = new Buffer(10);
    Step(
        function openA() {
            fs.open(path.join(__dirname, 'a.txt'), 'r', this);
        },
        function readFromA(err, fd) {
            if (err) {
                cb(err);
                return;
            }
            aFd = fd;
            fs.read(aFd, buffer, 0, 10, 10, this);
        },
        function openB(err) {
            if (err) {
                cb(err);
                return;
            }
            fs.open(path.join(__dirname, 'b.txt'), this);
        },
        function statB(err, fd) {
            if (err) {
                cb(err);
                return;
            }
            bFd = fd;
            fs.fstat(bFd, this);
        },
        function writeB(err, bStats) {
            if (err) {
                cb(err);
                return;
            }
            fs.write(bFd, buffer, 0, 10, bStats.size, cb);
        });
}

console.log('starting...');
doWhatWasAsked((err) => {
    if (err) throw err;
    console.log('done');
});