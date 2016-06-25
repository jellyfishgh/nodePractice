const async = require('async');
const fs = require('fs');

async.some([
    'does_not_exist.js',
    'also_does_not_exist.js',
    'also_does_not_exist_2.js',
    'filter.js'
], fs.exists, (result) => {
    console.log();
});