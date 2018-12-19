'use strict'

const commander = require('./UserInput').userInput;

const diagramBackgroundStyle = function() 
{
    const tableColor = commander.tableColor;

    if(tableColor)
    {
        const diagrambg = tableColor;

        return `{ bgcolor: "${diagrambg}" }`
    }

    return '';
}

const entityBackgroundStyle = function() 
{
    const entityColor = commander.entityColor;

    if(entityColor)
    {
        const entitybg = entityColor;

        return `, bgcolor: "${entitybg}"`
    }

    return '';
}

module.exports.diagramBackgroundStyle = diagramBackgroundStyle;
module.exports.entityBackgroundStyle = entityBackgroundStyle;