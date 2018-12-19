'use strict'

const commander = require('commander');

const userInput = commander
    .option('-i, --input [filename]', 'Define input model filename')
    .option('-o, --output [filename]', 'Define output .er filename')
    .option('-t, --title [string]', 'Title of document')
    .option('-f, --format [format]', 'specify compiled output format (pdf, png, svg)', 'pdf')
    .option('-c, --tableColor [color]', 'change color of table')
    .option('-e, --entityColor [color]', 'change color of table entities')
    .option('-m, --matching', 'Use input filename for output')
    .option('-n, --nocompile', 'Does only create an .er file and not compile to a visual format')
    .option('-d, --directory', 'Compiles all models in specified folder')
    .parse(process.argv);

module.exports.userInput = userInput;
