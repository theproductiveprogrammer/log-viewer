<script>
  import { onDestroy } from 'svelte';
  import LogLine from './LogLine.svelte';
  import FilterList from './FilterList.svelte';

  import { current_log, top_line } from '../state.js';

  import { applyNumlines, applyFilters, applySearch } from '../log-fns.js';
  import { scrollToTop } from '../util.js';

  let log;
  let numlines;
  let filters;
  let search;
  let lines;
  let cont;

  let numlines_release;
  let filters_release;
  let search_release;
  let current_log_release = current_log.subscribe(v1 => {
    log = v1;
    if(numlines_release) numlines_release();
    if(filters_release) filters_release();
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
  });

  function setLines() {
    lines = applyNumlines(log, numlines);
    if(!lines || !lines.length) top_line.set(null);
    else {
      top_line.set(lines[0].num);
    }
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
  {#each lines as line (log.src.id + line.num)}
    <LogLine {line} view={log.view} />
  {/each}
  </div>
</div>
{/key}

<style>
  .log-viewer-lines {
    overflow: scroll;
    height: 100vh;
  }
  .log-name {
    background: #efefff;
    text-align: center;
    padding: 8px 0;
    margin: 12px 0;
    font-weight: 600;
    font-size: 0.9em;
  }
</style>
