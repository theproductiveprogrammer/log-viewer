<script>
  import { slide } from 'svelte/transition';

  import { current_log,log_fetching, log_fetching_error } from '../state.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingLogs } from '../messages.js';
  import LogViewer from './LogViewer.svelte';
  import ToolBar from './ToolBar.svelte';

  import LogViewerBg from '../assets/log-viewer-bg.svelte';

</script>

{#key $current_log}
<ToolBar />
{/key}

{#if $log_fetching}
  <LoadingMessages messages={loadingLogs} />
{/if}
{#if $log_fetching_error}
  <div class="log-error" in:slide>Error: {$log_fetching_error.message}</div>
{/if}
{#if $current_log}
  <LogViewer />
{:else}
  <div class="bg">
    <LogViewerBg />
  </div>
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
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 100px);
    opacity: 0.16;
  }
</style>
