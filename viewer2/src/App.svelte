<script>
  import Counter from './lib/Counter.svelte';
  import { sources } from './stores.js';
  import { getSources } from './data.js';
  import SourceList from './lib/SourceList.svelte';

  export let serverURL;
  console.log(serverURL);

  let sourcesP = getSources(serverURL);

</script>

<main>
  <h1>Log Viewer</h1>

  <SourceList {sourcesP} />

</main>

<style>
</style>
