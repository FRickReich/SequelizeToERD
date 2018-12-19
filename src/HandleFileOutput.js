'use strict'

const fs = require('fs');
const commander = require('./UserInput').userInput;
const error = require('./Errors');

const getOutputLocation = function(filename)
{
    const outputFolder = 'output/';
    let outputFile = '';

    !fs.existsSync(outputFolder) && fs.mkdirSync(outputFolder);

    if(commander.output && commander.output.length > 0)
    {
        outputFile = filename;
        return outputFolder + outputFile;
    }
    else if(commander.matching && commander.input.length > 0 || commander.same && (commander.output && commander.output.length > 0) && commander.input.length > 0 || commander.directory )
    {
        outputFile = filename.split('/').pop().replace(".js", ".er");
        return outputFolder + outputFile;
    }

    error.errors.push('no output file specified');
}

module.exports.getOutputLocation = getOutputLocation;
