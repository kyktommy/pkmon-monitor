const Hapi = require('hapi')
const request = require('request')
const Inert = require('inert')
const path = require('path')

const server = new Hapi.Server()

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8989,
  routes: {
    cors: true,
    files: {
      relativeTo: path.join(__dirname, '..', 'web', 'static')
    }
  }
})

server.register(Inert, () => {})

server.route({
  method: 'GET',
  path: '/map/data/{lat}/{lng}',
  handler: (req, reply) => {
    const { lat, lng } = req.params
    request(
      'https://pokevision.com/map/data/' + lat + '/' + lng, 
      (err, res, body) => {
        if (err) return console.error(err)
        reply(body).code(200)
      }
    )
  }
})

server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: 'index.html'
  }
})

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.'
    }
  }
})

server.start((err) => {
  if (err) throw err
  console.log('proxy server started')
})

