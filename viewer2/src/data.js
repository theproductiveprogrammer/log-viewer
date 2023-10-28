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
              return {
                id: `${source.id}|${log}`,
                parent: {
                  type: source.type,
                  name: source.name,
                },
                name: log,
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

  return cache.sources;
}

export async function getLog(serverURL, forSource) {
  const now = Date.now();
  if(cache.logs[forSource] && (now - cache.logs[forSource].fetchedAt < 10000)) {
    console.log(`Resolving cached ${forSource.id}...`);
    await (new Promise(resolve => setTimeout(resolve, 2500)));
    return cache.logs[forSource].log;
  }

  console.log(`Fetching ${forSource.id}...`);
  const res = await fetch(`${serverURL}/log`, {
    method: 'POST', body: JSON.stringify(forSource), headers: { 'Content-Type' : 'application/json' },
  });
  if(res.ok) {
    const log = await res.text();
    cache.logs[forSource] = { log, fetchedAt: now }
    return log;
  } else {
    throw new Error(`Failed getting log: ${forSource.id}`);
  }
}

