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
      setTimeout(() => totlines = log.lines.filter(l => !l.x).length);
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

  function enterH(e) {
    if(e.key === 'Enter') addPage();
  }
</script>

<div class="log-toolbar-numlines" class:disabled>
  Showing <input {disabled} type=number bind:value={numlines} /> of {totlines}
  <span on:click|preventDefault={addPage} on:keypress={enterH} role="none">+10</span>
</div>

<style>
  .log-toolbar-numlines {
    font-size: 0.8em;
    margin-left: 1em;
  }
  .log-toolbar-numlines.disabled {
    opacity: 0.2;
  }
  span {
    font-weight: 500;
    font-size: 0.8em;
    cursor: pointer;
    color: #66f;
    opacity: 0.8;
    -webkit-user-select: none;
    user-select: none;
  }
  span:hover {
    text-decoration: underline;
  }
  .log-toolbar-numlines.disabled span {
    cursor: default;
  }
  .log-toolbar-numlines.disabled span:hover {
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
