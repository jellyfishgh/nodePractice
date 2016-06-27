const async = require('async');
const request = require('request');

var funcs = [];

for(var i = 0; i < 5; i++) {
    funcs.push(function(i){
        return function(done) {
            request({
                "uri": "http://localhost:4001",
                "body": i.toString()
            }, (err, res, body) => {
                done(err, body);
            })
        }
    }(i));
}

async.series(funcs, (err, result) => {
    if(err) throw err;
    console.log(`done: ${result}`);
});