<script>
  import { slide } from 'svelte/transition';

  import { current } from '../state.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingLogs } from '../messages.js';
  import LogLine from './LogLine.svelte';
  import Toolbar from './Toolbar.svelte';

</script>

{#if $current.fetching}
  <LoadingMessages messages={loadingLogs} />
{/if}
{#if $current.error}
  <div class="log-error" in:slide>Error: {$current.error.message}</div>
{/if}
{#if $current.log}
  <div class="log-name">{$current.log.src.name}</div>
  <Toolbar view={$current.log.view} />
  <div class="log-viewer-lines">
  {#each $current.log.lines as line ($current.log.src.id + line.num)}
    <LogLine {line} view={$current.log.view} />
  {/each}
  </div>
{/if}

<style>
  .log-viewer-lines {
    overflow: scroll;
    height: 100vh;
  }
  .log-name {
    text-align: right;
    margin-bottom: 12px;
    margin-right: 1em;
    font-weight: 600;
    font-size: 0.9em;
  }
  .log-error {
    width: 100%;
    background: #fdd;
    text-align: center;
    color: red;
    border: 1px solid #ccc;
    padding: 8px;
  }
</style>
