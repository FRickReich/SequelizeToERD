'use strict'

const exec = require('child_process').exec;
const { outputFormat } = require('./OutputFormat');

const createDiagramFile = function(outputLocation)
{
    let format = outputFormat();

    exec(`erd -i ${outputLocation} -f ${format} -o ${outputLocation.replace(".er", `.${format}`)}`);

    console.log(`Output created at /${outputLocation.replace(".er", `.${format}`)}`.green);
}

module.exports.createDiagramFile = createDiagramFile;