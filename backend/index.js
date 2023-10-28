import fs from 'fs';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import YAML from 'yaml';

const fastify = Fastify({ logger: true });
fastify.register(cors);

const cfg = YAML.parse(fs.readFileSync('./config.yml', 'utf8'))['log-viewer'];
const sources = sourceNames(cfg.sources);

fastify.get('/sources', (req, res) => res.send(sources));


/*    problem/
 * the config sources are listed by type:
 * log-viewer:
 *    sources:
 *      ftp:
 *        source1:
 *          ..details..
 *        source2:
 *          ..details..
 * we need to have them uniquely identified like so:
 *    ftp.source1, ftp.source2,...
 *
 *    way/
 * iterate over sources, iterate over source members, join the two and return
 */
function sourceNames(sources) {
  const names = [];
  for(let typ in sources) {
    for(let name in sources[typ]) names.push(`${typ}.${name}`);
  }
  return names;
}

const start = async () => {
  try {
    await fastify.listen({ port: cfg.port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
