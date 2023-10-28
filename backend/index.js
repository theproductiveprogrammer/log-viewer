import fs from 'fs';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import YAML from 'yaml';

import { fetch as fetchFTP } from './ftplogs.js';

const fastify = Fastify({ logger: true });
fastify.register(cors);

const cfg = YAML.parse(fs.readFileSync('./config.yml', 'utf8'))['log-viewer'];
const sources = sourceInfo(cfg.sources);

fastify.post('/sources', (req, res) => res.send(sources));
fastify.post('/log', async (req, res) => {
  if(req.body && req.body.type == 'ftp') {
    return await fetchFTP(cfg.sources.ftp[req.body.name]);
  }
  res.status(400).send(`Did not understand source: ${JSON.stringify(req.body)}`);
});


/*    problem/
 * the config sources have lots of details
 * log-viewer:
 *    sources:
 *      ftp:
 *        source1:
 *          ..details..
 *        source2:
 *          ..details..
 * we need only to return their identifiers:
 *    { type: 'ftp', name: 'source1' }, { type: 'ftp', name: 'source2' }...
 *
 *    way/
 * iterate over sources, iterate over source members, return the info
 */
function sourceInfo(sources) {
  const names = [];
  for(let type in sources) {
    for(let name in sources[type]) names.push({type, name});
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
