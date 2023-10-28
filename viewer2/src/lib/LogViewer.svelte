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
  <div class="log-name">{$current.log.name}</div>
  {$current.log.text}
{/if}

<style>
  .log-name {
    text-align: right;
    margin-bottom: 12px;
    margin-right: 1em;
    font-weight: bold;
    font-size: 0.9em;
  }
</style>
