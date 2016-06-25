const async = require('async');
const request = require('request');

var i = -1, n = i, lastResult = -1;

function test() {
    var pass = lastResult < 1000;
    if(pass) i = n;
    return pass;
}

function action(done){
    n = i + 1;
    request({
        "uri": "http://localhost:4001",
        "body": n.toString()
    }, (err, res, body) => {
        if(err) throw err;
        lastResult = parseInt(body, 10);
        done();
    });
}

async.whilst(test, action, (err) => {
    if(err) throw err;
    console.log(`the biggest integer whose square is smaller than 1000: ${i}`);
});