const async = require('async');
const fs = require('fs');
const filePaths = require('./filePaths');

async.every(filePaths, (element, next) => {
    fs.exists(element, (exists) => {
        console.log(`${element} ${exists}`);
        next(exists);
    });
}, (result) => {
    console.log(`${result}`);
});