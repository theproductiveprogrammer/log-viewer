<script>
  import { state } from '../state.js';
  export let sourcesP;
</script>

{#await sourcesP}
  <p>loading ...</p>
{:then sources}
  {#each sources as source (source)}
    <p on:click={e => $state.selectedSource = source}>{source}</p>
  {/each}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

