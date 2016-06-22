const spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var net = require('net');

fs.open(path.join(__dirname, 'test.txt'), 'a', (err, fd) => {
    if (err) throw err;
    var server = net.createServer((socket) => {
        socket.write(JSON.stringify({
            fd: fd
        }));
        // socket.end();
        // server.close();
    }).listen(4000, () => {
        // var child = spawn(process.argv[0], [path.join(__dirname, 'childProcessClient.js')]);
        // child.on('exit', () => {
        //     console.log('child process exited.');
        // });
    });
});