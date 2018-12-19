'use strict'

const template = function(documentTitle, tables, connection, font = "Helvetica")
{
    return (`
title { label: "${documentTitle}", font: "${font}" }
    
${tables}
    
${connection}     
    `);
}

module.exports.template = template;