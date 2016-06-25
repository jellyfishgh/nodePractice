const async = require('async');
const request = require('request');

var funcs = [
    function(done) {
        request({
            "uri": "http://localhost:4001",
            "body": '5'
        }, done);
    },
    function(res, body, done) {
        request({
            "uri": "http://localhost:4001",
            "body": body
        }, done);
    }
];

async.waterfall(funcs, (err, res, result) => {
    if(err) throw err;
    console.log(`5^4 = 5^2^2 = ${result}`);
});