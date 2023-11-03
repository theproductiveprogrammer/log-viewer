<script>
  import { onDestroy } from 'svelte';
  import OpenIcon from '../assets/open.svelte';

  import { auth, open_sources } from '../stores.js';

  export let log;

  $: only = !log && !$open_sources && $auth;
  $: tb_active = log;

  $: disabled = !$auth;


  let animate__bounce = false;

  let timer;
  if(!log && $auth) {
    timer = setInterval(() => animate__bounce = ! animate__bounce, 3000);
  }
  onDestroy((v) => clearInterval(timer));


  function openSources() {
    if(disabled) return;
    animate__bounce = false;
    clearInterval(timer);
    timer = null;
    $open_sources = !$open_sources;
  }

  function enterH(e) {
    if(e.key === 'Enter') openSources();
  }

</script>

<div class="log-toolbar-open animate__animated"
     class:animate__bounce
     class:disabled
     class:tb_active class:only
     title="open logs"
     on:click={openSources}
     on:keydown={enterH}
     role="none"
     >
  <OpenIcon />
</div>

<style>
  .log-toolbar-open {
    cursor: pointer;
    margin-right: 1em;
    transition: transform 500ms ease-in-out;
  }
  .log-toolbar-open.disabled,
  .log-toolbar-open.disabled:hover {
    cursor: default;
    opacity: 0.2;
    transform: none;
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
