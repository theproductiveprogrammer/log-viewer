<script>
  import { state } from '../state.js';
  import { getLogs } from '../data.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingLogs } from '../messages.js';

  export let serverURL;

  let logsP;

  $:if($state.selectedSource) {
    logsP = getLogs(serverURL, $state.selectedSource);
  }

</script>

{#if $state.selectedSource}

  {#await logsP}
    <LoadingMessages messages={loadingLogs} />
  {:then logs}
    <p>{logs}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

{/if}
