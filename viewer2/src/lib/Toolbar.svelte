<script>
  import { tick } from 'svelte';
  import { scale } from 'svelte/transition';

  import Switch from './Switch.svelte';
  import NumLines from './NumLines.svelte';

  import CopyIcon from '../assets/copy.svelte';

  import { copyToClipboard } from '../util.js';


  export let log;

  let ping;


  async function copyAction() {
    copyToClipboard(log.txt);
    ping = true;
    setTimeout(() => ping = false, 1000);
    await tick;
  }
</script>

<div class="log-viewer-toolbar">
  <div class="log-toolbar-leftpane">
    <div
      class="log-toolbar-copy" class:ping
      on:click|preventDefault={e => copyAction()}
      title="click to copy">
      <CopyIcon />
    </div>
    {#if ping}
      <div class="log-toolbar-copy-msg" transition:scale>copied</div>
    {/if}
  </div>
  <div class="log-toolbar-rightpane">
    <NumLines log={log} />
    <div class="log-toolbar-compact" >
      <Switch value={log.view.compact}/>
    </div>
  </div>
</div>

<style>
  .log-toolbar-copy-msg {
    font-size: 0.7em;
  }
  .log-toolbar-copy {
    opacity: 0.5;
    cursor: pointer;
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
  .log-toolbar-leftpane,
  .log-toolbar-rightpane {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    justify-content: right;
  }
  .log-viewer-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    justify-content: space-between;
    margin: 0 1em;
    padding-bottom: 12px;
  }
  .log-toolbar-compact {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 24px;
    margin-left: 12px;
  }
</style>
