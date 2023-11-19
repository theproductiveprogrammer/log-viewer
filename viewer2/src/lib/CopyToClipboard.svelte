<script>
  import { tick, onDestroy } from 'svelte';
  import { scale } from 'svelte/transition';

  import CopyIcon from '../assets/copy.svelte';

  import { copyToClipboard } from '../util.js';

  export let log;

  $: disabled = !log;

  let ping;

  let selections;
  let sel_release;
  if(log) {
    sel_release = log.view.selections.subscribe(v => selections = v);
  }

  async function copyAction() {
    if(disabled) return;

    let current;
    if(selections && selections.length) {
      current = log.lines.filter(l => log.view.selections.contains(l.num));
    } else {
      current = log.lines.filter(l => !l.x);
    }
    const txt = current
        .map(l => l.orig?l.orig:l.txt)
        .join("\n");
    copyToClipboard(txt);
    ping = true;
    setTimeout(() => ping = false, 1000);
    await tick;
  }

  function enterH(e) {
    if(e.key === 'Enter') copyAction();
  }

  onDestroy(() => {
    if(sel_release) sel_release();
  });

</script>


<div
  class="log-toolbar-copy" class:ping
  on:click|preventDefault={e => copyAction()}
  on:keydown={enterH}
  class:disabled
  title="click to copy"
  role="none">
  <CopyIcon />
</div>
{#if ping}
  <div class="log-toolbar-copy-msg" transition:scale>copied</div>
{/if}

<style>
  .log-toolbar-copy-msg {
    font-size: 0.7em;
    position: absolute;
    left: 32px;
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
