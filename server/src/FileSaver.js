'use strict';

const fs = require('fs');

module.exports = function (fileContents, outputFormat) {
    var fileName = 'data-' + new Date().getTime() + '.' + outputFormat;
    var filePath = 'generated/' + fileName;
    fs.writeFileSync(filePath, fileContents);

    return fileName;
};
