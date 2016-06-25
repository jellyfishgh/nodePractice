const request = require('request');
const myFilter = require('./myFilter');

var collection = [1, 2, 3, 4];

function filter(element, next) {
    process.nextTick(() => {
        next(null, element % 2 === 0);
    });
}

function map(elem, next) {
    request({
        "uri": "http://localhost:4001",
        "body": elem.toString()
    }, (err, res, body) => {
        next(err, body && parseInt(body, 10));
    });
}

myFilter(collection, filter, map, (err, result) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(result);
});