'use strict';

const Joi = require('joi');
const Faker = require('faker');

module.exports = {
    registerRoutes: function (server) {
        server.route({
            method: 'POST',
            path: '/generate',
            handler: function (request, reply) {

                Faker.locale = 'de';

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

                reply(generatedItems);
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
    }
};
