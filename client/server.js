'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Ejs = require('ejs');

const server = new Hapi.Server();
server.connection({ port: 8000 });

server.register([Vision, Inert], function (err) {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/assets/vendor/react/{param*}',
        handler: {
            directory: {
                path: 'node_modules/react'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/vendor/react-dom/{param*}',
        handler: {
            directory: {
                path: 'node_modules/react-dom'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/vendor/react-bootstrap/{param*}',
        handler: {
            directory: {
                path: 'node_modules/react-bootstrap'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index', {});
        }
    });

    server.views({
        engines: { ejs: Ejs },
        context: {
            asset: function (path) {
                return 'http://localhost:8000/' + path
            }
        },
        relativeTo: __dirname,
        path: 'resources/views',
        isCached: false
    });

    server.start(function (err) {
        if (err) {
            throw err;
        }

        console.log('Server running at: http://localhost:8000');
    });
});
