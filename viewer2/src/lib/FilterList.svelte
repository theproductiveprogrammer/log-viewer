<script>
  import { fade } from 'svelte/transition';
  import { removeFilter } from '../log-fns.js';

  export let log;
  let filters = log.view.filters;

  function msg(filter) {
    if(filter.type == '-') {
      return `Hidden lines containing:`;
    } else {
      return `Keeping lines containing:`;
    }
  }
</script>

<div class="log-filter-list-cont">
<div class="log-filter-list">
  {#each $filters as filter (filter.id)}
    <div
      class="log-filter-line" class:neg={filter.type == '-'}
      on:click={() => removeFilter(log, $filters, filter)}
      out:fade
      >
      <span class="log-filter-type">{msg(filter)}</span>
      <span class="log-filter-val">"{filter.val}"</span>
    </div>
  {/each}
</div>
</div>

<style>
  .log-filter-list {
    text-align: center;
    font-size: 0.8em;
  }
  .log-filter-line {
    margin: 1px;
    width: 100%;
    background: #beb;
    cursor: pointer;
    padding: 4px;
    opacity: 0.5;
  }
  .log-filter-line:hover {
    opacity: 1;
  }
  .log-filter-line.neg {
    background: #fcc;
  }
</style>
