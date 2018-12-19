'use strict'

const fs = require('fs');
const path = require('path');

const commander = require('./UserInput').userInput;
const error = require('./Errors');
const { restructureInput } = require('./Restructure');
const { getInputFile, getInputLocation } = require('./HandleFileInput');
const { getOutputLocation } = require('./HandleFileOutput');
const { createDiagramFile } = require('./CreateFile');
const { createTemplate } = require('./CreateTemplate');

const handleFile = function()
{
    const inputLocation = getInputLocation();
    const files = fs.readdirSync(`./${inputLocation}/`);

    for (let file in files) 
    {    
        if (commander.directory) 
        {
            streamFile(inputLocation, files[file]);
        }
        else 
        {
            if (files[file].indexOf(getInputFile()) !== -1)
            {
                streamFile(inputLocation, files[file]);
            }
        }
    }
}

const streamFile = function(folder, file) 
{
    let outputLocation = getOutputLocation(file);

    let data = '';
    let readStream = fs.createReadStream(path.join(__dirname, `/../${folder}`) + `/${file}`, 'utf8');

    readStream.on('error', function()
    {
        error.errors.push('input file does not exist');
        error.throwError();
    }
    ).on('data', function(chunk)
    {
        data += chunk;
        data = restructureInput(data);
    }
    ).on('end', function()
    {
        if(outputLocation)
        {
            let stream = fs.createWriteStream(outputLocation);

            stream.once('open', function(fd)
            {
                stream.write(createTemplate(data));

                if (!commander.nocompile)
                {
                    createDiagramFile(outputLocation);
                }

                console.log(`Output created at /${getOutputLocation(file)}`.green);

                stream.end();
            });
        }
    });
}

module.exports.handleFile = handleFile;
module.exports.streamFile = streamFile;