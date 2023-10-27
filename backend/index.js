const Fastify = require('fastify');
const sources = require('./sources.js');

const fastify = Fastify({ logger: true });

  res.send({ hello: 'world' })
fastify.get('/sources', function handler (req, res) {
})

fastify.listen({ port: 8887 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
