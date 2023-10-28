<script>
  import { state } from './state.js';
  import { getSources } from './data.js';
  import SourceList from './lib/SourceList.svelte';

  export let serverURL;

  let sourcesP = getSources(serverURL);

</script>

<main>
  <h1>Log Viewer</h1>

  <SourceList {sourcesP} />

  {#if $state.selectedSource}
    <p>Selected {$state.selectedSource.id}</p>
  {/if}

</main>

<style>
</style>
