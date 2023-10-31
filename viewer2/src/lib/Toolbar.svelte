<script>
  import Switch from './Switch.svelte';
  import NumLines from './NumLines.svelte';

  export let log;
</script>

<div class="log-viewer-toolbar">
  <NumLines log={log} />
  <div class="log-toolbar-compact" >
    <Switch value={log.view.compact}/>
  </div>
</div>

<style>
  .log-viewer-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    justify-content: right;
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
