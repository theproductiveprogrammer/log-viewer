<script>
  import { onDestroy } from 'svelte';
  import OpenIcon from '../assets/open.svelte';

  import { open_sources } from '../stores.js';

  export let log;

  $: only = !log && !$open_sources;
  $: tb_active = log;


  let animate__bounce = false;

  let timer;
  if(!log) {
    timer = setInterval(() => animate__bounce = ! animate__bounce, 3000);
  }
  onDestroy((v) => clearInterval(timer));


  function openSources() {
    animate__bounce = false;
    clearInterval(timer);
    timer = null;
    $open_sources = !$open_sources;
  }

</script>

<div class="log-toolbar-open animate__animated"
     class:animate__bounce
     class:tb_active class:only
     on:click={openSources} >
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
