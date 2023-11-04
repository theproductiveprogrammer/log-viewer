<script>
  import {version} from '../package.json';

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

  <div class="version">{version}</div>

</main>

<style>
  h1 {
    font-family: 'Rouge Script', cursive;
    font-size: 24px;
    text-align: center;
    padding: 0px;
    background: #efefff;
  }
  .version {
    font-size: 0.7em;
    position: absolute;
    top: 12px;
    right: 4px;
    color: white;
    opacity: 0.4;
  }
@media (prefers-color-scheme: light) {
  h1 {
    background: #333;
    color: #eef;
  }
}
</style>
