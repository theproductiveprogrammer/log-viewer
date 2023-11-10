<script>
  import { onDestroy } from 'svelte';
  import LogLine from './LogLine.svelte';
  import FilterList from './FilterList.svelte';

  import { current_log, top_line } from '../stores.js';

  import { applyNumlines, applyFilters, applySearch } from '../log-fns.js';
  import { scrollToTop, scrollToBottom } from '../util.js';

  let log;
  let numlines;
  let filters;
  let search;
  let lines;
  let cont;
  let has_more;

  let numlines_release;
  let filters_release;
  let search_release;
  let current_log_release = current_log.subscribe(v1 => {
    log = v1;
    if(numlines_release) numlines_release();
    if(filters_release) filters_release();
    if(search_release) search_release();
    if(!log) {
      numlines_release = null;
      filters_release = null;
      search_release = null;
      return;
    }
    numlines_release = log.view.numlines.subscribe(v2 => {
      numlines = v2;
      setLines();
      scrollToTop(cont);
    });
    filters_release = log.view.filters.subscribe(v3 => {
      filters = v3;
      applyFilters(log, filters);
      setLines();
    });
    search_release = log.view.search.subscribe(v4 => {
      search = v4;
      applySearch(log, search);
      setLines();
    });
    setTimeout(() => scrollToBottom(cont), 500);
  });

  function setLines() {
    lines = applyNumlines(log, numlines);
    if(!lines || !lines.length) {
      top_line.set(null);
      has_more = false;
    } else {
      top_line.set(lines[0].num);
      let totlines = log.lines.filter(l => !l.x).length;
      has_more = numlines < totlines;
    }
  }

  function load_more(e) {
    if(log) log.view.numlines.set(numlines + 1);
  }

  onDestroy((v) => {
    if(search_release) search_release();
    if(filters_release) filters_release();
    if(numlines_release) numlines_release();
    if(current_log_release) current_log_release();
  });
</script>

{#key log}
<div class="log-viewer">
  <div class="log-name">{log.src.name}</div>
  <FilterList log={log} />
  <div class="log-viewer-lines" bind:this={cont}>
    {#if has_more}<div class="fetch-more" on:click={load_more}>LOAD MORE (+1)...</div>{/if}
    {#each lines as line (log.src.id + line.num)}
      <LogLine {line} view={log.view} />
    {/each}
  </div>
</div>
{/key}

<style>
  .fetch-more {
    font-size: 0.6em;
    font-weight: bold;
    color: blue;
    color: #3f51b5;
    color: #0323f4;
    color: #3f53bf;
    color: #3a54df;
    text-align: center;
    padding-bottom: 8px;
    cursor: pointer;
    user-select: none;
    opacity: 0.8;
    transition: 360ms transform ease-out;
    transform: scale(0.9);
  }
  .fetch-more:hover {
    opacity: 1;
    transform: scale(1);
  }
  .log-viewer-lines {
    overflow: scroll;
    height: 100vh;
  }
  .log-name {
    background: #efefff;
    text-align: center;
    padding: 8px 0;
    margin-top: 1.5px;
    font-weight: 600;
    font-size: 0.9em;
  }
</style>
