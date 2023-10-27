<script>
  import { state } from '../state.js';
  export let sourcesP;
</script>

{#await sourcesP}
  <p>loading ...</p>
{:then sources}
  {#each sources as source (source)}
    <a href="#{source}" on:click|preventDefault={e => $state.selectedSource = source}>{source}</a>
  {/each}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

