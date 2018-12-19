'use strict'

const colors = require('colors');

let errors = [];

const throwError = function(errorMsg)
{
    if (errorMsg) {
        errors.push(errorMsg);
    }

    for(let i = 0; i < errors.length; i++) {
        console.log(`ERROR: ${errors[i]}`.red);
    }

    process.exit(1);
}

module.exports.throwError = throwError;
module.exports.errors = errors;