const async = require('async');
const fs = require('fs');
const filePaths = require('./filePaths')[process.argv[2] ? process.argv[2] : 'some'];

async.some(filePaths, (filePath, cb) => {
    fs.access(filePath, (err) => {
        cb(null, !err);
    })
}, (err, result) => {
    console.log(result);
});