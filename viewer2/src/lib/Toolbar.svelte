<script>
  import Switch from './Switch.svelte';
  import NumLines from './NumLines.svelte';
  import FilterBar from './FilterBar.svelte';
  import CopyToClipboard from './CopyToClipboard.svelte';

  export let log;

</script>

<div class="log-viewer-toolbar">
  <div class="log-toolbar-leftpane">
    <CopyToClipboard log={log} />
    <NumLines log={log} />

  </div>
  <div class="log-toolbar-rightpane">
    <FilterBar log={log} />
    <div class="log-toolbar-compact" >
      <Switch value={log.view.compact}/>
    </div>
  </div>
</div>

<style>
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
