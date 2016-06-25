const async = require('async');
const fs = require('fs');
const filePaths = require('./filePaths');

async.every(filePaths, fs.exists, (result) => {
    console.log(`${result}`);
});
