const async = require('async');
const fs = require('fs');
const filePaths = require('filePaths');

async.reject(files, fs.exists, (result) => {
    console.log(`${result} not exists`);
});