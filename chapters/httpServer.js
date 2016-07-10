const util = require('util');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(util.inspect(req.headers));
});
server.listen(4000, '127.0.0.1', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});