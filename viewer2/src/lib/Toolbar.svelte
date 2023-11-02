<script>
  import { readable } from 'svelte/store';
  let dummy = readable();

  import { current_log as log } from '../state.js';

  import Switch from './Switch.svelte';
  import NumLines from './NumLines.svelte';
  import FilterBar from './FilterBar.svelte';
  import CopyToClipboard from './CopyToClipboard.svelte';
  import GoToLine from './GoToLine.svelte';
  import OpenSources from './OpenSources.svelte';

</script>

<div class="log-viewer-toolbar">
  <div class="log-toolbar-leftpane">
    <OpenSources log={$log} />
    <CopyToClipboard log={$log} />
    <GoToLine log={$log} />
    <NumLines log={$log} />
  </div>
  <div class="log-toolbar-rightpane">
    <FilterBar log={$log} />
    <div class="log-toolbar-compact" >
      {#if $log}
      <Switch value={$log.view.compact} />
      {:else}
        <Switch value={dummy} disabled={true} />
      {/if}
    </div>
  </div>
</div>

<style>
  .log-viewer-toolbar {
    box-shadow: 0 1px 2px #9E9E9E;
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
    margin: 0;
    padding: 8px 1em;
  }
  .log-toolbar-compact {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 24px;
    margin-left: 12px;
  }
</style>
