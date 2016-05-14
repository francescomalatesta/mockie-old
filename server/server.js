'use strict';

const Hapi = require('hapi');

const Router = require('./src/Router');

const server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });

Router.registerRoutes(server);

server.start(function (err) {
    if (err) {
        throw err;
    }

    console.log('Server running at: http://localhost:3000');
});
