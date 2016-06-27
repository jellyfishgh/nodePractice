const async = require('async');
const fs = require('fs');
const filePaths = require('./filePaths')[process.argv[2] ? process.argv[2] : 'some'];

async.reject(filePaths, (element, next) => {
    fs.access(element, (err) => {
        next(null, !err);
    });
}, (err, results) => {
    results.map((result) => {
        console.log(`${result}`);
    });
});