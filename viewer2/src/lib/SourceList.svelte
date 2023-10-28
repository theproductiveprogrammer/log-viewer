<script>
  import { state } from '../state.js';
  export let sourcesP;
</script>

{#await sourcesP}
  <p>loading ...</p>
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
