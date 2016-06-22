const fs = require('fs');
const net = require('net');
const path = require('path');

const conn = net.createConnection(4000, 'localhost');
conn.on('data', (msg) => {
    msg = JSON.parse(msg);
    console.log(msg);
    fs.write(msg.fd, 'this is the child.\n', () => {
        conn.end();
    });
});