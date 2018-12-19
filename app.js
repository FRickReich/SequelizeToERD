'use strict';

const error = require('./src/Errors');
const { handleFile } = require('./src/HandleFile');

if(error.errors.length < 1)
{
    handleFile();
}
else
{
    error.throwError();
}