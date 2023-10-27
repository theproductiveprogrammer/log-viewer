const Fastify = require('fastify');
const sources = require('./sources.js');

const fastify = Fastify({ logger: true });
fastify.register(require('@fastify/cors'));

fastify.get('/sources', (req, res) => res.send(Object.keys(sources)))

fastify.listen({ port: 8887 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
