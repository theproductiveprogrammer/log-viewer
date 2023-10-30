<script>
  import { compact } from '../state.js';
  import Switch from './Switch.svelte';
</script>

<div class="log-viewer-toolbar">
  <div class="log-toolbar-compact" >
    <Switch value={compact}/>
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
