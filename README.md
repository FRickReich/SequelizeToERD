
# SEQUELIZE TO ERD

## USAGE
The minimal command is `node app.js -i <MODEL FILE> -m`, this will create a pdf with the same name of the input file into the `/output` directory.

## PREQUESITES
- run `npm install` in home directory before using this application.
- erd `https://github.com/BurntSushi/erd` has to be installed.

## OPTIONS

| Command       | Shortcut | Value      | Descriptiuon                                                                |
| ------------- | :------- | :--------- | :-------------------------------------------------------------------------- |
| --title       | -t       | [string]   | Title of Diagram - defaults to database model name.                         |
| --input       | -i       | [filename] | Input model filename, including file directory.                             |
| --output      | -o       | [filename] | Output .er file.                                                            |
| --matching    | -m       |            | Automaticly uses input filename for output file.                            |
| --nocompile   | -n       |            | Only creates .erd file for export, no visual diagram file.                  |
| --format      | -f       | [format]   | Output format for compiled diagram (pdf, png, svg) - defaults to pdf.       |
| --tableColor  | -c       | [color]    | Background color of table.                                                  |
| --entityColor | -e       | [color]    | Background color of table entities (Header stays as defined in tableColor). |
| --directory   | -d       |            | Compile all models in folder.                                               |
| --help        | -h       |            | Show help.                                                                  |

### INPUT
Input file should be an asyncronous sequelize model file.

#### Example samplemodel.js
    'use strict'

    const DataTypes = require('sequelize');

    module.exports.init = async function(db, config)
    {
        const sampleModel = db.define('sampleModel',
        {
            id : {
                type : DataTypes.STRING(2),
                primaryKey : true,
                allowNull : false
            },
            content : {
                type : DataTypes.STRING(150),
                allowNull : false
            }
        });
    }

### OUTPUT
filename used for output file.

### MATCHING
Uses the input filename as output filename.

### TITLE
The Documents header title, written above the diagram in the visual file. If not set, this will default to the table name, or multiple table names.

not set:

    Entity-Relationship-Diagram of sampleModel

set with value `-t This is a test`:

    This is a test

### FORMAT
If compiling is activated (default), the document will be compiled to the selected format. Available formats are png, svg, pdf, with the latter being the default setting.

### TABLECOLOR
Define the diagram background and header color of the diagram in hex color code.

### ENTITYCOLOR
Define the diagram entity color of the diagram in hex color code.

### NOCOMPILE
Only creates an er file, and no pdf, svg or png file.

### DIRECTORY
works with all model files in the directory.
