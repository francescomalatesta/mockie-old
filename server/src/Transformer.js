'use strict';

module.exports = function (generatedItems, outputFormat) {
    var transformerName = outputFormat[0].toUpperCase() + outputFormat.slice(1) + 'Transformer';
    var transformerStrategy = require('./Transformers/' + transformerName);

    return transformerStrategy(generatedItems);
};
