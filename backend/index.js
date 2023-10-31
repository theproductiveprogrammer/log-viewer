import path from 'path';
import { mkdir, readFile } from 'node:fs/promises';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import YAML from 'yaml';

import { fetch as fetchFTP } from './ftplogs.js';
import { fetch as fetchFile } from './filelogs.js';

const fastify = Fastify({ logger: true });
fastify.register(cors);

/*    config */
const cfgPath = new URL('./config.yml', import.meta.url);
const cfg = YAML.parse(await readFile(cfgPath, {encoding: 'utf8'}))['log-viewer'];
const sources = sourceInfo(cfg.sources);
if(!cfg.download || !cfg.download.folder) throw new Error("log-viewer.download.folder config parameter missing");
if(!cfg.port) throw new Error("log-viewer.port config parameter missing");
await mkdir(cfg.download.folder, { recursive: true });

/*    routing */
fastify.post('/sources', (req, res) => res.send(sources));
fastify.post('/log', async (req, res) => {
  if(req.body && req.body.parent && req.body.parent.name) {
    if(req.body.parent.type == 'file') {
      const data = await fetchFile(cfg.sources.file[req.body.parent.name], req.body.name);
      res.header('Content-Type', 'application/octect-stream');
      res.send(data);
      return res;
    } else if(req.body.parent.type == 'ftp') {
      const dst = path.join(cfg.download.folder, req.body.parent.name);
      await mkdir(dst, { recursive: true });
      const data = await fetchFTP(dst, cfg.sources.ftp[req.body.parent.name], req.body.name);
      res.header('Content-Type', 'application/octect-stream');
      res.send(data);
      return res;
    }
  }
  res.status(400).send(`Did not understand source: ${JSON.stringify(req.body)}`);
});




/*    other functions */


/*    problem/
 * the config sources have lots of details
 * log-viewer:
 *    sources:
 *      ftp:
 *        source1:
 *          ..details..
 *          logs:
 *            - log1
 *            - log2
 *        source2:
 *          ..details..
 *            - log3
 *            - log4
 * we need to return their types, names, and transformers:
 *    { type: 'ftp', name: 'source1', logs: [ log1, log2], transformers:[...] },
 *    { type: 'ftp', name: 'source2', logs: [...] }...,
 *
 *    way/
 * iterate over sources, iterate over source members, return the info
 */
function sourceInfo(sources) {
  const infos = [];
  for(let type in sources) {
    const s = sources[type];
    for(let name in s) {
      const curr = s[name];
      const compact = curr.compact;
      const transformers = curr.transformers;
      infos.push({compact, type, name, logs: s[name].logs, transformers});
    }
  }
  return infos;
}



/*    start up */

const start = async () => {
  try {
    await fastify.listen({ port: cfg.port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
