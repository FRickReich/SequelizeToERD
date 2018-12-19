'use strict'

const commander = require('./UserInput').userInput;
const error = require('./Errors');

const getInputFile = function() 
{
    if(commander.input && commander.input.length > 0)
    {
        const inputFile = commander.input.split('/').pop();
        
        return inputFile;
    }

    error.errors.push('cannot read input file');
}

const getInputLocation = function() 
{
    if(commander.input && commander.input.length > 0)
    {
        let inputFolder = '';
        let input =  commander.input.split('/');
        
        input.splice(input.length - 1, 1);

        inputFolder = input.join('/');
        inputFolder += '/';

        return inputFolder;
    }

    error.errors.push('cannot read input directory');
}

module.exports.getInputFile = getInputFile;
module.exports.getInputLocation = getInputLocation;
