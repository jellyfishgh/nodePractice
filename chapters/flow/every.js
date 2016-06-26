const async = require('async');
const fs = require('fs');
const filePaths = require('./filePaths')[process.argv[2] ? process.argv[2] : 'some'];

async.every(filePaths, (item, cb) => {
    fs.access(item, (err) => {
        console.log(item);
        cb(null, !err);
    });
}, (err, result) => {
    console.log(`--> ${result}`);
});
