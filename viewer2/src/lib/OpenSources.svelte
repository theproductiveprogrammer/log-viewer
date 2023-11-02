<script>
  import OpenIcon from '../assets/open.svelte';

  export let log;

  $: only = !log;
  $: tb_active = log;

  import { open_sources } from '../state.js';

</script>

<div class="log-toolbar-open" class:tb_active class:only on:click={e => $open_sources = true} >
  <OpenIcon />
</div>

<style>
  .log-toolbar-open {
    cursor: pointer;
    margin-right: 1em;
    transition: transform 500ms ease-in-out;
  }
  .log-toolbar-open:hover {
    opacity: 0.5;
    transform: scale(1.2);
  }
  .log-toolbar-open.tb_active {
    opacity: 0.5;
  }
  .log-toolbar-open.only {
    fill: red;
    fill: #F44336;
  }
</style>
