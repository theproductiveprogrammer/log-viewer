<script>
  import { slide } from 'svelte/transition';

  import { current_log,log_fetching, log_fetching_error } from '../state.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingLogs } from '../messages.js';
  import LogViewer from './LogViewer.svelte';

</script>

{#if $log_fetching}
  <LoadingMessages messages={loadingLogs} />
{/if}
{#if $log_fetching_error}
  <div class="log-error" in:slide>Error: {$log_fetching_error.message}</div>
{/if}
{#if $current_log}
  <LogViewer />
{/if}

<style>
  .log-error {
    width: 100%;
    background: #fdd;
    text-align: center;
    color: red;
    border: 1px solid #ccc;
    padding: 8px;
  }
</style>
