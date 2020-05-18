const express = require('express');
const bodyParser = require('body-parser');
const apicache = require('apicache');

const routes = require('./routes');

const server = express();

// note: Invalidate cache every 10 minutes since weather services get updated every 10 minutes
server.use(apicache.middleware('10 minutes'));

server.use(bodyParser.json());
server.use(routes);

module.exports = server;