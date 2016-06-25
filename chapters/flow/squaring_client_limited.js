const async = require('async');
const request = require('request');

var collection = [];

for(var i = 0; i < 1000; i++){
    collection.push(i);
}

function iterator(element, next){
    console.log(element);
    request({
        "uri": "http://localhost:4001",
        "body": element.toString()
    }, (err, res, body) => {
        console.log(`${element}^2 = body`);
        next(err);
    });
}

var maxConcurrency = 5;

async.forEachLimit(collection, maxConcurrency, iterator, () => {
    console.log('finished');
});