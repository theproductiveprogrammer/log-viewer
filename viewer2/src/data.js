export async function getSources(serverURL) {
  const res = await fetch(`${serverURL}/sources`);
  if(res.ok) {
    const sources = await res.json();
    if(sources) {
      sources.forEach(source => source.id = `${source.type}.${source.name}`);
    } else {
      throw new Error('Did not get existing sources');
    }
    return sources;
  } else {
    throw new Error('Failed getting existing sources');
  }
}
