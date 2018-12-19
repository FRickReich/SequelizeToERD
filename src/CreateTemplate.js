'use strict'

const commander = require('./UserInput').userInput;
const { createDiagramStructure, createDiagramConnections } = require('./diagramStructure');
const { diagramBackgroundStyle, entityBackgroundStyle } = require('./Styling');
const { template } = require('./Template');
const error = require('./errors');

const createTemplate = function(data) 
{
    const modelArray = createDiagramStructure(data);
    const connection = createDiagramConnections(data);
    const backgroundColor = diagramBackgroundStyle();
    const entitiesColor = entityBackgroundStyle();

    let documentTitle = "";

    if (backgroundColor.indexOf(true) > 0)
    {
        error.errors.push('wrong input in backgroundColor')
    }

    if (entitiesColor.indexOf(true) > 0)
    {
        error.errors.push('wrong input in entitiesColor')
    }

    let tables = "";

    if(error.errors.length < 1)
    {
        for(let td in modelArray)
        {
            let entities = "";

            for (let etd in modelArray[td].entities)
            {
                let entityTitle = "";
                let entityType = modelArray[td].entities[etd].type;
                let entityValue = "";

                if(modelArray[td].entities[etd].value) {
                    entityValue = `(${modelArray[td].entities[etd].value})`;
                }

                if(modelArray[td].entities[etd].primary === true)
                {
                    entityTitle = `*${modelArray[td].entities[etd].title}`;
                }
                else
                {
                    entityTitle = modelArray[td].entities[etd].title;
                }

                entities += `${entityTitle} { label: "${entityType}${entityValue}" ${entitiesColor} }\n`;
            }

            tables += `[${modelArray[td].title}]${backgroundColor}\n${entities}\n`;
        }

        if(commander.title && commander.title.length > 0)
        {
            documentTitle = commander.title;
        }
        else
        {
            if (modelArray.length > 1) {
                documentTitle = `Entity-Relationship-Diagram of ${modelArray[1].title} & ${modelArray[0].title}`;
            } else {
                documentTitle = `Entity-Relationship-Diagram of ${modelArray[0].title}`;
            }
            
        }

        return template(documentTitle, tables, connection, "Helvetica");
    }
    else
    {
        error.throwError();
    }
}

module.exports.createTemplate = createTemplate;