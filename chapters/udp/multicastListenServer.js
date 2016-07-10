const dgram = require('dgram');

const server = dgram.createSocket('udp4');
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});
server.on('message', (message, rinfo) => {
    console.log(`server got message: ${message} from ${rinfo.address}:${rinfo.port}`)
});
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening on ${address.address}:${address.port}`);
});
server.addMembership('localhost');
server.bind(41324);