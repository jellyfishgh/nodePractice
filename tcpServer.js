const net = require('net');

var clients = [];

var port = 4000;

net.createServer((client) => {
    console.log(`${client.remoteAddress} : ${client.remotePort}`);
    clients.push(client);
    client.on('data', (data) => {
        console.log(data.toString());
        clients.map((cli) => {
            if (cli !== client) cli.write(data);
        });
    });
    client.on('end', () => {
        var pos = clients.indexOf(client);
        if (pos > 0) {
            clients.splice(pos, 1);
        }
    });
}).listen(port);

console.log('socket server listening at: ' + port);