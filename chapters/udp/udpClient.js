const dgram = require('dgram');

const client = dgram.createSocket('udp4');
const message = new Buffer('this is a message.');
client.bind(4001);
client.send(message, 0, message.length, 4000, 'localhost');
client.close();