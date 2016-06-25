const async = require('async');
const request = require('request');

var collection = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4}
];

function iterator(element, next) {
    request({
        "uri": "http://loalhost:4001",
        "body": element.value.toString()
    }, (err, res, body) => {
        element.result = parseInt(body, 10);
        next(err);
    })
}

async.forEach(collection, iterator, (err, result) => {
    console.log('finished.');
    console.log(collection);
});