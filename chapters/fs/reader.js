const fs = require('fs');

fs.open('./reader.js', 'r', (err, fd) => {
    if (err) throw err;
    const readBuffer = new Buffer(1024),
        bufferOffset = 0,
        bufferLength = readBuffer.length,
        filePosition = 100;
    fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, (err, readBytes) => {
        if(err) throw err;
        console.log(`just read ${readBytes} bytes.`);
        if(readBytes > 0) {
            console.log(readBuffer.slice(0, readBytes).toString());
        }
    });
});