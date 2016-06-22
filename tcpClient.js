const net = require('net');

var host = process.argv[2];
var port = process.argv[3];

var conn = net.createConnection(port, host);
process.stdin.resume();
process.stdin.pipe(conn);
conn.pipe(process.stdout, { end: false });