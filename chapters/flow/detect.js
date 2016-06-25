const async = require('async');
const fs = require('fs');
const filePaths = require('./filePaths');

async.detect(filePaths, fs.exists, (result) => {
    console.log(`${result}`);
});