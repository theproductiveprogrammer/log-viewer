<script>
  import { onDestroy } from 'svelte';

  export let log;

  $: numlines = log.view.numlines;

</script>

<div class="log-toolbar-numlines">
  Showing <input type=number bind:value={$numlines} /> of {log.lines.length}
  <a on:click|preventDefault={e => $numlines += 10}>+10</a>
</div>

<style>
  .log-toolbar-numlines {
    font-size: 0.8em;
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
  input {
    width: 4em;
    border: none;
    background: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
  }
</style>
