import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/sources', async function handler (req, res) {

})

try {
  await fastify.listen({ port: 8887 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
