<script>
  import { onDestroy } from 'svelte';

  export let log;

  let numlines = "-";
  let totlines = "-";
  let disabled = true;

  let numlines_release;
  let filters_release;
  if(log) {
    disabled = false;
    if(numlines_release) numlines_release();
    numlines_release = log.view.numlines.subscribe(v => numlines = v);
    filters_release = log.view.filters.subscribe(v => {
      totlines = log.lines.filter(l => !l.x).length;
    });
  }

  onDestroy(() => {
    if(numlines_release) numlines_release();
    if(filters_release) filters_release();
  });

  function addPage() {
    if(log && numlines) {
      log.view.numlines.set(numlines + 10);
    }
  }
</script>

<div class="log-toolbar-numlines" class:disabled>
  Showing <input {disabled} type=number bind:value={numlines} /> of {totlines}
  <a on:click|preventDefault={addPage}>+10</a>
</div>

<style>
  .log-toolbar-numlines {
    font-size: 0.8em;
    margin-left: 1em;
  }
  .log-toolbar-numlines.disabled {
    opacity: 0.2;
  }
  a {
    font-weight: 500;
    font-size: 0.8em;
    cursor: pointer;
    color: #66f;
    opacity: 0.8;
    -webkit-user-select: none;
    user-select: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .log-toolbar-numlines.disabled a {
    cursor: default;
  }
  .log-toolbar-numlines.disabled a:hover {
    text-decoration: none;
  }

  input {
    width: 4em;
    border: none;
    background: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
  }
</style>
