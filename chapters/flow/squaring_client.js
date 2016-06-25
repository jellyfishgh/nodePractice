const async = require('async');
const request = require('request');

var collections = [1, 2, 3, 4];

function iterator(element, next) {
    request({
        "uri": "http://localhost:4001",
        "body": element.toString()
    }, (err, res, body) => {
        console.log(`${element}^2 = ${body}`);
    });
}

async.forEach(collections, iterator, () => {
    console.log('finished');
});