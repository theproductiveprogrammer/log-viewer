<script>
  import { auth, current_log, log_fetching, log_fetching_error, open_sources } from '../stores.js';
  import { getSources, getLog } from '../data.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingSources } from '../messages.js';
  import { slide } from 'svelte/transition';
  import { cap } from '../util.js';

  export let serverURL;

  let sourcesP;
  let token;

  auth.subscribe(token_ => {
    token = token_
    sourcesP = getSources(serverURL, token);
  });

  let fetching = {}
  async function loadCurrent(source, log) {
    if(!log) return;
    if(fetching[log.id]) return;
    fetching[log.id] = true;
    $log_fetching = true;
    $log_fetching_error = null;
    open_sources.set(false);
    try {
      $current_log = await getLog(serverURL, source.transformers, log, token);
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
  {#if $open_sources}
    <div class="source-list" transition:slide={{axis:'x'}} >
      <div class="close" on:click={e => $open_sources = false}>x</div>
      {#if sources}
      {#each sources as source (source.id)}
        <div class="source-name">{cap(source.name)}</div>
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
      {/if}
    </div>
  {/if}
{:catch error}
  <div class="log-error">{error.message}</div>
{/await}

<style>
  .close {
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px;
    padding: 6px;
    line-height: 6px;
    border-radius: 50%;
    border: 1px solid #eee;
    color: #999;
    font-size: 0.8em;
    cursor: pointer;
  }
  .close:hover {
    background: #eee;
    color: #009;
  }
  .source-placeholder {
    display: block;
    width: 100%;
    height: 2em;
  }
  .source-list, .source-panel {
    position: absolute;
    top: 84px;
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
    padding-top: 12px;
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
    margin-left: 12px;
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
