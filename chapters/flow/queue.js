const async = require('async');
const request = require('request');

function worker(number, done){
    request({
        "uri": "http://localhost:4001",
        "body": number.toString()
    }, (err, res, body) => {
        done(err, number, parseInt(body, 10));
    })
}

var queue = async.queue(worker, 5);

for(var i = 0; i < 1000; i++){
    queue.push(i , (err, number, squared) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log(`${number}^2 = ${squared}`);
    });
}

queue.drain = function() {
    console.log('queue drained.');
}