const EventEmitter = require('events');
const net = require('net');
const http = require('http');
const Buffer = require('buffer').Buffer;

class Hose extends EventEmitter {
    constructor(port) {
        super();
        net.createServer((socket) => {
            socket.on('data', (data) => {
                const str = data.toString('utf-8').replace(/\s/g, '');
                console.log(str);
                if(str === 'exit'){
                    this.emit('exit');
                    socket.destroy();
                }else {
                    this.emit('data', data);
                }
            });
        }).listen(port);
        console.log('net socket is listening on: ' + port);
    }
}

const hoser = new Hose(9001);

const port = 9000;

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    var buffer = new Buffer('');
    hoser.on('data', (data) => {
        buffer += data;
    });
    hoser.on('exit', () => {
        res.end(buffer);
    });
}).listen(port);
console.log('http server is listening on: ' + port);