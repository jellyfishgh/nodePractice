const dgram = require('dgram');

var host = process.argv[2];
var port = process.argv[3];

const client = dgram.createSocket('udp4');
process.stdin.resume();
client.send("hello", port, host, (err) => {
    if (err) client.close();
});
client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    // client.send(msg, port, host, (err) => {
    //     if (err) client.close();
    // });
});