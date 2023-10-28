<script>
  import { current } from '../state.js';
  import { getSources, getLog } from '../data.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingSources } from '../messages.js';
  import { slide } from 'svelte/transition';

  export let serverURL;

  let visible;
  let sourcesP = getSources(serverURL);

  let fetching = {}
  async function loadCurrent(log) {
    if(!log) return;
    if(fetching[log.id]) return;
    fetching[log.id] = true;
    $current.fetching = true;
    visible = false;
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
  {#if visible}
    <div class="source-list" transition:slide={{axis:'x'}} >
      {#each sources as source (source.id)}
        <div class="source-name">{source.name}</div>
        <ul>
        {#each source.logs as log (log.id)}
          <li>
            <a href="#{log.id}" on:click|preventDefault={e => loadCurrent(log)}>
              {#if $current.log && log.id == $current.log.id}
                <span class="selected">{log.name} &rarr;</span>
              {:else}
                {log.name}
              {/if}
            </a>
          </li>
        {/each}
        </ul>
      {/each}
    </div>
  {:else}
    <div class="source-panel" on:click={e => visible = true}>Sources</div>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  .source-panel, .source-list {
    position: absolute;
    z-index: 1000;
    box-shadow: 0 0 1px #666;
  }
  .source-panel {
    background: #333;
    color: #eef;
    -webkit-user-select: none;
    user-select: none;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    padding-right: 8px;
    font-size: 0.8em;
    cursor: pointer;
  }
  .source-list {
    position: absolute;
    z-index: 1000;
    background: white;
    padding: 2em;
    padding-left: 1.6em;
    padding-top: 0;
    box-shadow: 0 0 1px #666;
  }
  .source-name {
    margin-top: 1em;
    font-weight: bold;
    font-variant: all-small-caps;
  }
  a {
    text-decoration: none;
  }
  a .selected {
    color: #009;
  }
  .selected {
    font-weight: 600;
  }
  ul {
    list-style-type: none;
    margin-left: 4px;
  }
  a {
    display: block;
  }
</style>
