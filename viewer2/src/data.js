import makeLog, { rx_ify} from './log-fns.js';
import { compact, makeNumlines, makeFilters, makeSearch } from './stores.js';

const cache = {
  sources: null,
  logs: {},
}

export async function login(serverURL, username, password) {
  if(!username) return { error: "Missing username" };
  if(!password) return { error: "Missing password" };
  const res = await fetch(`${serverURL}/login`, {
    method: 'POST', body: JSON.stringify({username,password}), headers: { 'Content-Type' : 'application/json' },
  });

  let info;
  try {
     info = await res.json();
  } catch(e) { /* ignore */ }

  if(!res.ok) {
    const msg = info && info.msg || `Error: ${res.statusText}`;
    throw new Error(msg)
  }
  return info;
}

export async function getSources(serverURL, auth) {
  if(!auth) return;
  if(!cache.sources) {
    console.log('Fetching sources...');
    const res = await fetch(`${serverURL}/sources`, {
      method: 'POST', body: JSON.stringify({auth}), headers: { 'Content-Type' : 'application/json' },
    });
    let sources;
    try {
      sources = await res.json();
    } catch(e) { /* ignore */ }
    if(!res || !res.ok || !sources) {
      if(sources && sources.error) throw new Error(sources.error);
      throw new Error("Failed getting sources");
    }
    sources.forEach(source => {
      source.id = `${source.type}.${source.name}`;
      if(source.transformers) {
        source.transformers = rx_ify(source.transformers);
      }
      if(source.logs) {
        source.logs = source.logs.map(log => {
          if(typeof log === 'string') {
            log = { name: log };
          }
          return {
            ...log,
            id: `${source.id}|${log.name}`,
            compact: source.compact,
            transformers: source.transformers,
            parent: {
              type: source.type,
              name: source.name,
            },
          }
        });
      }
    });
    cache.sources = sources;
  }

  console.log(cache.sources)
  return cache.sources;
}

export async function getLog(serverURL, transformers, forSource, auth) {
  const now = Date.now();
  if(cache.logs[forSource.id] && (now - cache.logs[forSource.id].fetchedAt < 10000)) {
    console.log(`Resolving cached ${forSource.id}...`);
    await (new Promise(resolve => setTimeout(resolve, 3500)));
    return cache.logs[forSource.id];
  }

  console.log(`Fetching ${forSource.id}...`);
  const res = await fetch(`${serverURL}/log`, {
    method: 'POST', body: JSON.stringify({ forSource, auth }), headers: { 'Content-Type' : 'application/json' },
  });
  if(!res.ok) {
    throw new Error(`Failed getting log: ${forSource.id}`);
  }

  const txt = await res.text();
  let log = cache.logs[forSource.id];
  if(!log) {
    log = {
      src: forSource,
      lines: [],
      view: {
        numlines: makeNumlines(),
        filters: makeFilters(),
        search: makeSearch(),
      },
      fetchedAt: now,
    };
    if(forSource.compact) compact.set(true);
  };
  await makeLog(forSource.name, transformers, txt, log);
  cache.logs[forSource.id] = log;
  return log;
}
