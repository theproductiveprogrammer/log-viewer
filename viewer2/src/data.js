export async function getSources(serverURL) {
  const res = await fetch(`${serverURL}/sources`);
  if(res.ok) {
    return await res.text();
  } else {
    throw new Error('Failed getting exisitng sources');
  }
}
