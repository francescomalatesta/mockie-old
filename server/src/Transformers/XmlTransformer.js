'use strict';

const js2xml = require('js2xmlparser');

module.exports = function (generatedItems) {
    return js2xml('items', { item: generatedItems });
};
