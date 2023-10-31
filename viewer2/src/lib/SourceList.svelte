<script>
  import { current_log, log_fetching, log_fetching_error } from '../state.js';
  import { getSources, getLog } from '../data.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingSources } from '../messages.js';
  import { slide } from 'svelte/transition';

  export let serverURL;

  let visible;
  let sourcesP = getSources(serverURL);

  let fetching = {}
  async function loadCurrent(source, log) {
    if(!log) return;
    if(fetching[log.id]) return;
    fetching[log.id] = true;
    $log_fetching = true;
    $log_fetching_error = null;
    visible = false;
    try {
      $current_log = await getLog(serverURL, source.transformers, log);
      delete fetching[log.id];
      $log_fetching = false;
    } catch(e) {
      delete fetching[log.id];
      $current_log = null;
      $log_fetching = false;
      $log_fetching_error = e;
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
            <a href="#{log.id}" on:click|preventDefault={e => loadCurrent(source, log)} on:keydown|preventDefault={e => loadCurrent(log)}>
              {#if $current_log && log.id == $current_log.src.id}
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
    <div class="source-placeholder">&nbsp;</div>
    <div class="source-panel" on:click={e => visible = true} on:keydown={e => visible = true}>Sources</div>
  {/if}
{:catch error}
  <div class="log-error">{error.message}</div>
{/await}

<style>
  .source-placeholder {
    display: block;
    width: 100%;
    height: 2em;
  }
  .source-list, .source-panel {
    position: absolute;
    top: 55px;
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
  .log-error {
    width: 100%;
    background: #fdd;
    text-align: center;
    color: red;
    border: 1px solid #ccc;
    padding: 8px;
  }
</style>
