<script>
  import Switch from './Switch.svelte';
  import NumLines from './NumLines.svelte';

  export let log;
</script>

<div class="log-viewer-toolbar">
  <div class="log-toolbar-leftpane">
  </div>
  <div class="log-toolbar-rightpane">
    <NumLines log={log} />
    <div class="log-toolbar-compact" >
      <Switch value={log.view.compact}/>
    </div>
  </div>
</div>

<style>
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
    margin-right: 1em;
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
