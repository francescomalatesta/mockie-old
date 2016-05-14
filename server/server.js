'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const Router = require('./src/Router');

const server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });

Router.registerRoutes(server);

server.register([Inert], function (err) {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/downloads/{filename}',
        handler: function (request, reply) {
                reply.file('generated/' + request.params.filename)
                    .header('Content-Disposition', 'attachment');
        }
    });

    server.start(function (err) {
        if (err) {
            throw err;
        }

        console.log('Server running at: http://localhost:3000');
    });
});
