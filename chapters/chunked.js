const spawn = require('child_process').spawn;
const http = require('http');

const port = 4000;
http.createServer((req, res) => {
    var child = spawn('tail', ['-f', '/var/log/system.log']);
    child.stdout.pipe(res);
    res.on('end', () => {
        console.log(`${child.pid} killed.`);
        child.kill();
    });
}).listen(port);
console.log(`http server listening on port: ${port}`);