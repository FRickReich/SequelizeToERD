'use strict'

const restructureInput = function(data) 
{
    const commentLines = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gi;

    const newData = data
        .replace(commentLines, "");

    return newData
        .replace(/\n\n/gm, "\n")
        .replace(/\s\n/gm, "")
        .replace(/\n/gm, "")
        .replace(/\s+/g, "");
}

module.exports.restructureInput = restructureInput;