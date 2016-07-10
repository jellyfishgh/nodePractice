const dgram = require('dgram');

const client = dgram.createSocket('udp4');
const message = new Buffer('this is a message.');
client.setMulticastTTL(10);
client.send(message, 0, message.length, 4000, '230.1.2.3');
client.close();