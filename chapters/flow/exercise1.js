const fs = require('fs');
const path = require('path');

function doWhatWasAsked(cb) {
    fs.open(path.join(__dirname, 'a.txt'), 'r', (err, aFd) => {
        if (err) {
            cb(err);
            return;
        }
        var buffer = new Buffer(10);
        fs.read(aFd, buffer, 0, 10, 10, (err, bytesRead) => {
            if (err) {
                cb(err);
                return;
            }
            fs.open(path.join(___dirname, 'b.txt'), 'a', (err, bFd) => {
                if (err) {
                    cb(err);
                    return;
                }
                fs.fstat(bFd, (err, bStats) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    fs.write(bFd, buffer, 0, 10, bStats.size, cb);
                });
            });
        });
    });
}

console.log('starting...');
doWhatWasAsked((err) => {
    if(err) throw err;
    console.log('done');
});