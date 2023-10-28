<script>
  import SourceList from './lib/SourceList.svelte';
  import LogViewer from './lib/LogViewer.svelte';

  export let serverURL;
</script>

<main>
  <h1>Log Viewer</h1>

  <SourceList {serverURL} />
  <LogViewer {serverURL} />

</main>

<style>
</style>
