'use strict';

const Joi = require('joi');

const fileSaver = require('./FileSaver');
const oldFileRemover = require('./OldFileRemover');
const transformer = require('./Transformer');
const generator = require('./Generator');

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
                    transformer(
                        generator(
                            fields,
                            itemsCount
                        ),
                        outputFormat
                    ),
                    outputFormat
                );

                reply({
                    status: 'success',
                    url: 'http://localhost:3000/downloads/' + url
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
                var generatedItems = generator(fields, 1);
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
