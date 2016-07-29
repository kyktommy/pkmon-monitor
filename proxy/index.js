const Hapi = require('hapi')
const request = require('request')

const server = new Hapi.Server()

server.connection({
  host: '0.0.0.0',
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
        if (err) return console.error(err)
        reply(body).code(200)
      }
    )
  }

})

server.start()

