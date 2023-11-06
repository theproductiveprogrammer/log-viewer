<script>
  import { auth, current_log, log_fetching, log_fetching_error, open_sources } from '../stores.js';
  import { getSources, getLog } from '../data.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingSources } from '../messages.js';
  import { slide } from 'svelte/transition';
  import { cap } from '../util.js';

  import CloseBtn from '../assets/close.svelte';

  export let serverURL;

  let sourcesP;
  let token;
  let sources;

  let filterstr;
  $: filtered_sources = filter_1(sources, filterstr);
  function filter_1(sources, filterstr) {
    const ret = [];
    if(sources) sources.forEach(s => {
      if(!s.logs || !filterstr) {
        ret.push(s);
        return;
      }
      const logs = s.logs.filter(l => {
        if(/[A-Z]/.test(filterstr)) return l.name.indexOf(filterstr) !== -1;
        return l.name.toLowerCase().indexOf(filterstr) !== -1;
      });
      if(logs.length) {
        ret.push({...s, logs});
      }
    });
    return ret;
  }

  $: {
    if(sourcesP) {
      sourcesP
        .then(s => sources = s)
        .catch(error => {
          console.error("Error fetching sources", error);
          if(error.authError) auth.set(null);
        });
    }
  }

  let search;
  $: if($open_sources) {
    if(search) search.focus();
  }

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
      if(e.authError) auth.set(null);
    }
  }

  function enterH(e) {
    if(e.key === 'Enter') $open_sources = false;
  }
  function escH(e) {
    if(e.key === 'Escape') $open_sources = false;
  }
</script>

{#await sourcesP}
  <LoadingMessages messages={loadingSources} />
{:then s}
  {#if $open_sources}
    <div class="source-list" transition:slide={{axis:'x'}} >
      <div class="header-cont">
        <div class="header-left">
          <span class="header">Logs</span>
        </div>
        <div class="header-right">
          <input placeholder="search" bind:value={filterstr} bind:this={search} on:keydown={escH} />
          <div class="closebtn" on:click={e => $open_sources = false} on:keydown={enterH} role="none"><CloseBtn /></div>
        </div>
      </div>
      {#if filtered_sources}
      <div class="body-cont">
      {#each filtered_sources as source (source.id)}
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
      </div>
      {/if}
    </div>
  {/if}
{:catch error}
  <div class="log-error">{error.message}</div>
{/await}

<style>
  .source-list {
    position: absolute;
    z-index: 1000;
    background: white;
    box-shadow: 0 0 1px #666;
  }
  .body-cont {
    height: calc(100vh - 130px);
    overflow: scroll;
    padding: 2em;
    padding-left: 1.6em;
    padding-top: 12px;
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
  input {
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  .header-cont {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    background: #ccc;
    overflow: hidden;
    height: 2em;
  }
  .header {
    padding: 0.8em;
  }
  .header-right {
    display: flex;
    flex-direction: row;
  }
  .closebtn {
    margin-right: 6px;
    margin-left: 6px;
    display: inline-block;
    opacity: 0.5;
    cursor: pointer;
    line-height: 2em;
  }
  .closebtn:hover {
    opacity: 1;
  }

</style>
