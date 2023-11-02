<script>
  import { tick } from 'svelte';
  import { scale } from 'svelte/transition';

  import CopyIcon from '../assets/copy.svelte';

  import { copyToClipboard } from '../util.js';

  export let log;

  $: disabled = !log;

  let ping;

  async function copyAction() {
    if(disabled) return;
    copyToClipboard(log.txt);
    ping = true;
    setTimeout(() => ping = false, 1000);
    await tick;
  }

</script>


<div
  class="log-toolbar-copy" class:ping
  on:click|preventDefault={e => copyAction()}
  class:disabled
  title="click to copy">
  <CopyIcon />
</div>
{#if ping}
  <div class="log-toolbar-copy-msg" transition:scale>copied</div>
{/if}

<style>
  .log-toolbar-copy-msg {
    font-size: 0.7em;
    position: absolute;
    left: 0;
    top: 0;
  }
  .log-toolbar-copy {
    opacity: 0.5;
    cursor: pointer;
    margin-right: 1em;
    transition: transform 500ms ease-in-out;
  }
  .log-toolbar-copy:hover {
    opacity: 0.5;
    transform: scale(1.2);
  }
  .log-toolbar-copy.ping,
  .log-toolbar-copy.ping:hover {
    transform: scale(0.1);
  }
  .log-toolbar-copy.disabled:hover,
  .log-toolbar-copy.disabled {
    cursor: default;
    transform: none;
    opacity: 0.2;
  }
</style>
