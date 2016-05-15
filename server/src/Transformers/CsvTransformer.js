'use strict';

const toCSV = require('array-to-csv');

module.exports = function (generatedItems) {
    var csvLines = [];

    csvLines.push(Object.keys(generatedItems[0]));

    var line;
    for(var c in generatedItems) {
        line = [];

        for(var i in generatedItems[c]) {
            line.push(generatedItems[c][i]);
        }

        csvLines.push(line);
    }

    return toCSV(csvLines);
};
