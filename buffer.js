var Buffer = require('buffer').Buffer;

var buffer = new Buffer(100);

for (var i = 0; i < buffer.length; i++) {
    buffer[i] = i;
}

printBuf(buffer);

var sliceBuffer = buffer.slice(40, 60);

printBuf(sliceBuffer);

var copyBuffer = new Buffer(20);
buffer.copy(copyBuffer, 0, 40, 60);

printBuf(copyBuffer);

function printBuf(buf) {
    console.log(buf);
    console.log(buf.toString('utf-8'));
}