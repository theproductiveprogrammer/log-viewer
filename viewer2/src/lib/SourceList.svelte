<script>
  import { state } from '../state.js';
  import { getSources } from '../data.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingSources } from '../messages.js';

  export let serverURL;

  let sourcesP = getSources(serverURL);
</script>

{#await sourcesP}
  <LoadingMessages messages={loadingSources} />
{:then sources}
  {#each sources as source (source.id)}
    <a href="#{source.id}" on:click|preventDefault={e => $state.selectedSource = source}>{source.name}</a>
  {/each}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  a {
    display: block;
  }
</style>
