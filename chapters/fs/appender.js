const fs = require('fs');

function startAppender(fd, startPos) {
    var pos = startPos;
    return {
        append: function (buffer, cb) {
            var written = 0,
                oldPos = pos;
            pos += buffer.length;
            (function tryWriting(){
                if(written < buffer.length){
                    fs.write(fd, buffer, written, buffer.length - written, oldPos + written, (err, bytesWritten) => {
                        if(err){
                            cb(err);
                            return;
                        }
                        written += bytesWritten;
                        tryWriting();
                    });
                }else{
                    cb(null);
                }
            })();
        }
    }
}

fs.open('test.txt', 'a', (err, fd) => {
    if(err) throw err;
    fs.fstat(fd, (err, stats) => {
        if(err) throw err;
        console.log(stats);
        var appender = startAppender(fd, stats.size);
        appender.append(new Buffer('append this!\n'), (err) => {
            if(err) throw err;
            console.log('appended');
        });
    });
});