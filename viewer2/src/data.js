import makeLog, { rx_ify} from './log-fns.js';
import { makeCompact } from './state.js';

const cache = {
  sources: null,
  logs: {},
}

const inFlight = {}

export async function getSources(serverURL) {
  if(!cache.sources) {
    console.log('Fetching sources from server...');
    const res = await fetch(`${serverURL}/sources`, { method: 'POST' });
    if(res.ok) {
      const sources = await res.json();
      if(sources) {
        sources.forEach(source => {
          source.id = `${source.type}.${source.name}`;
          if(source.logs) {
            source.logs = source.logs.map(log => {
              if(typeof log === 'string') {
                log = { name: log };
              }
              if(log.transformers) {
                log.transformers = rx_ify(log.transformers);
              }
              return {
                ...log,
                id: `${source.id}|${log.name}`,
                parent: {
                  type: source.type,
                  name: source.name,
                },
              }
            });
          }
        });
      } else {
        throw new Error('Did not get existing sources');
      }
      cache.sources = sources;
    } else {
      throw new Error('Failed getting existing sources');
    }
  }

  console.log(cache.sources)
  return cache.sources;
}

export async function getLog(serverURL, forSource) {
  const now = Date.now();
  if(cache.logs[forSource.id] && (now - cache.logs[forSource.id].fetchedAt < 10000)) {
    console.log(`Resolving cached ${forSource.id}...`);
    await (new Promise(resolve => setTimeout(resolve, 3500)));
    return cache.logs[forSource.id];
  }

  console.log(`Fetching ${forSource.id}...`);
  const res = await fetch(`${serverURL}/log`, {
    method: 'POST', body: JSON.stringify(forSource), headers: { 'Content-Type' : 'application/json' },
  });
  if(!res.ok) {
    throw new Error(`Failed getting log: ${forSource.id}`);
  }

  const txt = await res.text();
  const log = cache.logs[forSource.id] || {
    src: forSource,
    lines: [],
    view: {
      compact: makeCompact(),
    },
    fetchedAt: now,
  };
  makeLog(forSource.name, forSource.transformers, txt, log);
  cache.logs[forSource.id] = log;
  return log;
}
