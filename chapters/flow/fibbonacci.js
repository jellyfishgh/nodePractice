const async = require('async');
const request = require('request');

var items = [],
    order = process.argv[2] && parseInt(process.argv[2]),
    orderMinus2 = order - 2,
    memo = [0, 1];

for (var i = 0; i < orderMinus2; i++) {
    items.push(i);
}

function iterator(memo, item, next) {
    request({
        uri: "http://localhost:4001",
        form: {
            a: memo[0],
            b: memo[1]
        }
    }, (err, res, body) => {
        next(err, [memo[1], parseInt(body, 10)]);
    });
}

async.reduce(items, memo, interator, (err, result) => {
    if (err) throw err;
    console.log(`${order}, ${result[1]}`);
});