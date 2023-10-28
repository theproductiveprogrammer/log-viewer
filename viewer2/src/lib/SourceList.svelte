<script>
  import { current } from '../state.js';
  import { getSources, getLog } from '../data.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingSources } from '../messages.js';

  export let serverURL;

  let sourcesP = getSources(serverURL);

  let fetching = {}

  async function loadCurrent(log) {
    if(!log) return;
    if(fetching[log.id]) return;
    fetching[log.id] = true;
    $current.fetching = true;
    try {
      $current.log = await getLog(serverURL, log);
      delete fetching[log.id];
      $current.fetching = false;
      $current.error = null;
    } catch(e) {
      delete fetching[log.id];
      $current.log = null;
      $current.fetching = false;
      $current.error = e;
    }
  }
</script>

{#await sourcesP}
  <LoadingMessages messages={loadingSources} />
{:then sources}
  {#each sources as source (source.id)}
    <p>{source.name}</p>
    <ul>
    {#each source.logs as log (log.id)}
      <li><a href="#{log.id}" on:click|preventDefault={e => loadCurrent(log)}>{log.name}</a></li>
    {/each}
    </ul>
  {/each}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  a {
    display: block;
  }
</style>
