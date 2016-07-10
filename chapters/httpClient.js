const http = require('http');
const util = require('util');
const querystring = require('querystring');

var postData = querystring.stringify({
    'msg': 'Hello World!'
});

var options = {
    hostname: 'www.baidu.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${util.inspect(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    })
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();