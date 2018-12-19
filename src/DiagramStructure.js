'use strict'

const createDiagramStructure = function(data) {
    const regexTable = new RegExp(`const([A-z]+)=db.define.\'([A-z]+)\'.{([^;]+)}`, "gi");
    const regexEntity = new RegExp(`([a-zA-Z0-9_.-]*):{type:Datatypes.([A-z]+).([0-9]*)([^}]+)\}`,"gmi");
    const regexPrimaryKey = new RegExp(`primaryKey:true`, "mi")

    let tableTitle;
    let output = [];

    while (tableTitle = regexTable.exec(data))
    {
        let entityValue;
        let entities = [];

        while (entityValue = regexEntity.exec(tableTitle[3]))
        {
            let entityType = "";

            switch (entityValue[2])
            {
                case "STRING":
                    entityType = "varchar";
                    break;
                case "INTEGER":
                    entityType = "int";
                    break
                case "DATE":
                    entityType = "datetime";
                    break;
                case "TEXT":
                    entityType = "text";
                    break;
            }

            entities.push(
            {
                title: entityValue[1],
                type: entityType,
                value: entityValue[3],
                primary: regexPrimaryKey.test(entityValue[4])
            });
        }

        output.push(
        {
            title: tableTitle[1],
            entities: entities
        });
    }

    return output;
}

const createDiagramConnections = function(data) 
{
    const regexHasOne = new RegExp(/([a-zA-Z]*).hasOne.([a-zA-Z]*)/g);
    const regexBelongsToMany =  new RegExp(/([a-zA-Z]*).belongsToMany.([a-zA-Z]*)/g);
    const regexHasMany = new RegExp(/([a-zA-Z]*).hasMany.([a-zA-Z]*)/g);

    let dataArray;
    let output = [ ];

    while ((dataArray = regexHasOne.exec(data)) != null)
    {
        output.push(
        {
            parent: dataArray[1],
            child: dataArray[2],
            type: "1--1"
        });
    }

    while ((dataArray = regexBelongsToMany.exec(data)) != null)
    {
        output.push(
        {
            parent: dataArray[1],
            child: dataArray[2],
            type: "*--*"
        });
    }

    while ((dataArray = regexHasMany.exec(data)) != null)
    {
        output.push(
        {
            parent: dataArray[1],
            child: dataArray[2],
            type: "1--*"
        });
    }

    let returnString = "";

    for(var item in output)
    {
        returnString += `${output[item].parent} ${output[item].type} ${output[item].child}\n`;
    }

    return returnString;
}

module.exports.createDiagramStructure = createDiagramStructure;
module.exports.createDiagramConnections = createDiagramConnections;