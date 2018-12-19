'use strict'

const commander = require('./UserInput').userInput;

const outputFormat = function()
{
    const format = commander.format;

    if(format)
    {
        switch(format)
        {
            default:
            case "pdf":
                return 'pdf';
            case "png":
                return 'png';
            case "svg":
                return 'svg';
        }
    }

    return 'pdf';
}

module.exports.outputFormat = outputFormat;