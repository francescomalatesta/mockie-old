'use strict';

const Faker = require('faker');

module.exports = function (fields, itemsCount) {
    var generatedItems = [];
    var item;
    for(var c = 0; c < itemsCount; c++) {
        item = {};

        for(var i in fields) {
            item[fields[i].name] = Faker.fake('{{' + fields[i].type + '}}');
        }

        generatedItems.push(item);
    }

    return generatedItems;
};
