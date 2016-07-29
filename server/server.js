'use strict';

var Hapi = require('hapi');
var request = require('request');
var Inert = require('inert');
var path = require('path');

var server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: 8989,
  routes: {
    cors: true,
    files: {
      relativeTo: path.join(__dirname, '..', 'web', 'static')
    }
  }
});

server.register(Inert, function () {});

server.route({
  method: 'GET',
  path: '/map/data/{lat}/{lng}',
  handler: function handler(req, reply) {
    var _req$params = req.params;
    var lat = _req$params.lat;
    var lng = _req$params.lng;

    request('https://pokevision.com/map/data/' + lat + '/' + lng, function (err, res, body) {
      if (err) return console.error(err);
      reply(body).code(200);
    });
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.'
    }
  }
});

server.start(function (err) {
  if (err) throw err;
  console.log('proxy server started');
});
