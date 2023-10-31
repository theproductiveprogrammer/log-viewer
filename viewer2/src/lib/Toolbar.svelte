<script>
  import { tick } from 'svelte';
  import { scale } from 'svelte/transition';

  import Switch from './Switch.svelte';
  import NumLines from './NumLines.svelte';

  import CopyIcon from '../assets/copy.svelte';

  import { copyToClipboard } from '../util.js';
  import { addFilter } from '../log-fns.js';


  export let log;

  let ping;
  let hide;
  let keep;

  async function copyAction() {
    copyToClipboard(log.txt);
    ping = true;
    setTimeout(() => ping = false, 1000);
    await tick;
  }

  async function filter() {
    addFilter('-', hide, log);
    addFilter('+', keep, log);
    hide = "";
    keep = "";
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

    <NumLines log={log} />

  </div>
  <div class="log-toolbar-rightpane">
    <div class="log-search-bar">
      <div>Hide: <input type="text" bind:value={hide}></div>
      <div>Keep: <input type="text" bind:value={keep}></div>
      <button on:click={filter}>Go</button>
    </div>
    <div class="log-toolbar-compact" >
      <Switch value={log.view.compact}/>
    </div>
  </div>
</div>

<style>

  button {
    border: none;
    box-shadow: 0px 0px 1px #575760;
    cursor: pointer;
    width: 3em;
    margin-left: 4px;
    transition: transform 300ms ease-in-out;
    background-color: #f9f9f9;
  }
  button:hover {
    transform: translateY(-0.5px);
    background-color: #f6f6f6;
  }
  button:active {
    transform: translateY(2px);
    background-color: #eee;
  }
  .log-toolbar-copy-msg {
    font-size: 0.7em;
    position: absolute;
  }
  .log-search-bar {
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
  }
  .log-search-bar div {
    margin-left: 1em;
  }
  .log-search-bar input {
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    width: 6em;
    font-size: 0.9em;
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
  .log-toolbar-leftpane,
  .log-toolbar-rightpane {
    position: relative;
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
