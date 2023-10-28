const cache = {
  sources: null,
  logs: {},
}

export async function getSources(serverURL) {
  if(!cache.sources) {
    console.log('Fetching sources from server...');
    const res = await fetch(`${serverURL}/sources`, { method: 'POST' });
    if(res.ok) {
      const sources = await res.json();
      if(sources) {
        sources.forEach(source => source.id = `${source.type}.${source.name}`);
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

export async function getLogs(serverURL, forSource) {
  const now = Date.now();
  if(cache.logs[forSource] && (now - cache.logs[forSource].fetchedAt < 10000)) {
    return cache.logs[forSource];
  }

  console.log(`Fetching ${forSource.id} logs...`);
  const res = await fetch(`${serverURL}/log`, {
    method: 'POST', body: JSON.stringify(forSource), headers: { 'Content-Type' : 'application/json' },
  });
  if(res.ok) {
    const logs = await res.json();
    cache.logs[forSource] = logs;
    return logs;
  } else {
    throw new Error(`Failed getting log: ${forSource.id}`);
  }
}

