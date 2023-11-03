<script>
  import { auth } from './stores.js';

  import SourceList from './lib/SourceList.svelte';
  import LogsViewer from './lib/LogsViewer.svelte';
  import Login from './lib/Login.svelte';

  import 'animate.css';

  export let serverURL;
</script>

<main>
  <h1>Log Viewer</h1>

  {#key $auth}
  {#if !$auth}
    <Login {serverURL} />
  {/if}
  <SourceList {serverURL} />
  <LogsViewer />
  {/key}

</main>

<style>
  h1 {
    font-family: 'Rouge Script', cursive;
    font-size: 24px;
    text-align: center;
    padding: 0px;
    background: #efefff;
  }
@media (prefers-color-scheme: light) {
  h1 {
    background: #333;
    color: #eef;
  }
}
</style>
