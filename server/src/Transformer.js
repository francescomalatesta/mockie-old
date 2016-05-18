'use strict';

module.exports = function (generatedItems, outputFormat) {
    var transformerName = outputFormat[0].toUpperCase() + outputFormat.slice(1) + 'Transformer';

    try {
        var transformerStrategy = require('./Transformers/' + transformerName);
    } catch(e) {
        throw new Error('Cannot load the ' + transformerName + ' transformer.');
    }

    return transformerStrategy(generatedItems);
};
