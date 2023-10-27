import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });
fastify.register(cors);

fastify.get('/sources', (req, res) => res.send(Object.keys(sources)))

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
