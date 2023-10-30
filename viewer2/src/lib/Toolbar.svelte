<script>
  import Switch from './Switch.svelte';

  export let view;
</script>

<div class="log-viewer-toolbar">
  <div class="log-toolbar-compact" >
    <Switch value={view.compact}/>
  </div>
</div>

<style>
  .log-viewer-toolbar {
    display: flex;
    justify-content: flex-end;
    justify-content: right;
    margin-right: 1em;
  }
</style>
