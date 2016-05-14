'use strict';

const fs = require('fs');

const Joi = require('joi');
const Faker = require('faker');

const findRemoveSync = require('find-remove');

function removeOldFiles() {
    findRemoveSync('generated', {age: {seconds: 120}, ignore: '.gitignore' });
}

function saveFile(fileContents) {
    var fileName = 'data-' + new Date().getTime() + '.json';
    fs.writeFileSync('generated/' + fileName, fileContents);
    return fileName;
}

function transform(generatedItems) {
    return JSON.stringify(generatedItems);
}

module.exports = {
    registerRoutes: function (server) {
        server.route({
            method: 'POST',
            path: '/generate',
            handler: function (request, reply) {
                var fields = request.payload.fields;
                var itemsCount = request.payload.count;
                var outputFormat = request.payload.format;

                var generatedItems = [];
                var item;
                for(var c = 0; c < itemsCount; c++) {
                    item = {};

                    for(var i in fields) {
                        item[fields[i].name] = Faker.fake('{{' + fields[i].type + '}}');
                    }

                    generatedItems.push(item);
                }

                removeOldFiles();

                var url = saveFile(
                    transform(generatedItems)
                );

                reply({
                    status: 'success',
                    url: url
                });
            },
            config: {
                validate: {
                    payload: {
                        fields: Joi.array().min(1).items(Joi.object().keys({
                            name: Joi.string().required(),
                            type: Joi.string().required()
                        })).required(),
                        count: Joi.number().min(1).required(),
                        output: Joi.string().required()
                    }
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/preview',
            handler: function (request, reply) {
                var fields = request.payload.fields;

                var item = {};
                for(var i in fields) {
                    item[fields[i].name] = Faker.fake('{{' + fields[i].type + '}}');
                }

                reply([item]);
            },
            config: {
                validate: {
                    payload: {
                        fields: Joi.array().min(1).items(Joi.object().keys({
                            name: Joi.string().required(),
                            type: Joi.string().required()
                        })).required()
                    }
                }
            }
        });
    }
};
