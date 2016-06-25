const async = require('async');
const request = require('request');

var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push((i) => {
        return function (done) {
            request({
                "uri": "http://localhost:4001",
                "body": i.toString()
            }, (err, res, body) => {
                done(err, body);
            });
        };
    });
}

async.parallel(funcs, (err, result) => {
    if(err) throw err;
    console.log(`${result}`);
});