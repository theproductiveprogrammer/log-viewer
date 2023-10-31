<script>
  import SourceList from './lib/SourceList.svelte';
  import LogsViewer from './lib/LogsViewer.svelte';

  export let serverURL;
</script>

<main>
  <h1>Log Viewer</h1>

  <SourceList {serverURL} />
  <LogsViewer />

</main>

<style>
</style>
