import path from 'path';
import { mkdir, readFile } from 'node:fs/promises';
const { createHash, } = await import('node:crypto');
import { default as jt } from '@tpp/jt';

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
fastify.post('/login', async (req, res) => {
  const username = req.body && req.body.username;
  if(!req.body || !username || !req.body.password) {
    req.log.info(`Login attempt for: "${username}" failed`);
    return { error: "Login failed!" };
  }
  const ok = login(cfg, username, req.body.password);
  req.log.info(`Login attempt for: ${username} ${ok ? "ok" : "failed"}`);
  if(!ok) return { error: 'Login failed. Please try again' };
  token(cfg, username, (error,token) => res.send({error,token}));
  return res;
});
fastify.post('/sources', async (req, res) => {
  const err_auth = await authErr(req);
  if(err_auth) res.status(403).send({ error: err_auth });
  else res.send(sources);
});
fastify.post('/log', async (req, res) => {
  const err_auth = await authErr(req);
  if(err_auth) {
    res.status(403).send({ error: err_auth });
    return res;
  }
  const forSource = req.body.forSource;
  if(forSource && forSource.parent && forSource.parent.name) {
    if(forSource.parent.type == 'file') {
      const data = await fetchFile(cfg.sources.file[forSource.parent.name], forSource.name);
      res.header('Content-Type', 'application/octect-stream');
      res.send(data);
      return res;
    } else if(forSource.parent.type == 'ftp') {
      console.log(2, cfg.sources.file[forSource.parent.name], forSource.name);
      const dst = path.join(cfg.download.folder, forSource.parent.name);
      await mkdir(dst, { recursive: true });
      console.log(8, cfg.sources.file[forSource.parent.name], forSource.name);
      const data = await fetchFTP(dst, cfg.sources.ftp[forSource.parent.name], forSource.name);
      res.header('Content-Type', 'application/octect-stream');
      res.send(data);
      return res;
    }
  }
  res.status(400).send(`Did not understand source: ${JSON.stringify(forSource)}`);
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


function login(cfg, user, pass) {
  if(!cfg || !cfg.users || !user || !pass) return false;
  user = user.trim();
  pass = pass.trim();
  const hash = createHash('md5');
  hash.update(`${user}+${pass}`);
  pass = hash.digest('hex');
  for(let i = 0;i < cfg.users.length;i++) {
    const u = cfg.users[i];
    if(u.username === user && u.password === pass) return true;
  }
  return false;
}

function token(cfg, name, cb) {
  jt.token({
    iss: "log-viewer",
    sub: "log-analysis",
    exp: jt.exp.days(2),
  }, {
    name,
  }, cfg.auth.key, cb);
}

async function authErr(req) {
  if(!req || !req.body || !req.body.auth) return "Not authenticated: 1211";
  return new Promise(res => {
    jt.check(req.body.auth, cfg.auth.key, "log-viewer", "log-analysis", (error, payload, header) => {
      if(error) res(`Authentication failed: ${error}`);
      else res();
    });
  });
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
