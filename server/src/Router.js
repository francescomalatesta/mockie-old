'use strict';

const fs = require('fs');

const Joi = require('joi');
const Faker = require('faker');

const fileSaver = require('./FileSaver');
const oldFileRemover = require('./OldFileRemover');

function transform(generatedItems, outputFormat) {
    var transformerName = outputFormat[0].toUpperCase() + outputFormat.slice(1);
    var transformer = require('./Transformers/' + transformerName + 'Transformer');

    return transformer(generatedItems);
}

function generateItems(fields, itemsCount) {
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
}

module.exports = {
    registerRoutes: function (server) {
        server.route({
            method: 'POST',
            path: '/generate',
            handler: function (request, reply) {
                var fields = request.payload.fields;
                var itemsCount = request.payload.count;
                var outputFormat = request.payload.output;

                oldFileRemover();

                var url = fileSaver(
                    transform(
                        generateItems(fields, itemsCount),
                        outputFormat
                    ),
                    outputFormat
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
                var generatedItems = generateItems(fields, 1);
                reply(generatedItems);
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
