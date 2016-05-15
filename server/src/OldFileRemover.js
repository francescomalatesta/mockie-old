'use strict';

const findRemoveSync = require('find-remove');

module.exports = function () {
    findRemoveSync('generated', {age: {seconds: 120}, ignore: '.gitignore' });
};
