<script>
  import { getSources } from './data.js';
  import SourceList from './lib/SourceList.svelte';

  export let serverURL;

  let sourcesP = getSources(serverURL);
  sourcesP.then(sources => console.log(sources))

</script>

<main>
  <h1>Log Viewer</h1>

  <SourceList {sourcesP} />

</main>

<style>
</style>
