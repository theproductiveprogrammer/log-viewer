<script>
  import SourceList from './lib/SourceList.svelte';
  import LogsViewer from './lib/LogsViewer.svelte';

  import 'animate.css';

  export let serverURL;
</script>

<main>
  <h1>Log Viewer</h1>

  <SourceList {serverURL} />
  <LogsViewer />

</main>

<style>
  h1 {
    font-family: 'Rouge Script', cursive;
    font-size: 24px;
    text-align: center;
    background: #333;
    color: #eef;
    padding: 0px;
  }
</style>
