<script>
  import { current } from '../state.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingLogs } from '../messages.js';

</script>

{#if $current.fetching}
    <LoadingMessages messages={loadingLogs} />
{/if}
{#if $current.error}
  <p style="color: red">{error.message}</p>
{/if}
{#if $current.log}
    <p>Logs:{$current.log}</p>
{/if}
