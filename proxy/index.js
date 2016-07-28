const Hapi = require('hapi')
const request = require('request')
const corsHeader = require('hapi-cors-headers')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8989,
  routes: {
    cors: true
  }
})

server.route({

  method: 'GET',
  path: '/map/data/{lat}/{lng}',
  handler: (req, reply) => {
    const { lat, lng } = req.params
    request(
      'https://pokevision.com/map/data/' + lat + '/' + lng, 
      (err, res, body) => {
        reply(body).code(200)
      }
    )
  }

})

server.start()

