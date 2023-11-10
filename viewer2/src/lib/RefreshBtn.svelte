<script>
  import { refresh } from '../stores.js';

  import RefreshIcon from '../assets/refresh.svelte';

  export let log;

  $: disabled = !log;

  function refresh_() {
    if(disabled) return;
    if($refresh) $refresh();
  }
</script>

<div
  on:click={refresh_}
  class:disabled
  class="log-toolbar-refresh"
  title="refresh"
  role="none"
  >
  <RefreshIcon />
</div>

<style>
  .log-toolbar-refresh {
    opacity: 0.5;
    cursor: pointer;
    margin-right: 1em;
    transition: transform 500ms ease-in-out;
  }
  .log-toolbar-refresh:hover {
    opacity: 0.6;
    fill: #339;
    transform: scale(1.1);
  }
  .log-toolbar-refresh.disabled:hover,
  .log-toolbar-refresh.disabled {
    cursor: default;
    transform: none;
    opacity: 0.2;
  }
</style>
