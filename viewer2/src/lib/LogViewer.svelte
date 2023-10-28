<script>
  import { slide } from 'svelte/transition';

  import { current } from '../state.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingLogs } from '../messages.js';
  import { hasNfo } from '../log-fns.js';
  import AfterInfo from './AfterInfo.svelte';

</script>

{#if $current.fetching}
    <LoadingMessages messages={loadingLogs} />
{/if}
{#if $current.error}
  <div class="log-error" in:slide>Error: {$current.error.message}</div>
{/if}
{#if $current.log}
  <div class="log-name">{$current.log.src.name}</div>
  {#each $current.log.lines as line (line.num)}
    <div class="log-line" class:plain={!hasNfo(line.nfo)}>
      <div class="log-mark-cont">
      <div class="log-mark">
        <input type="checkbox">
        {#if line.nfo && line.nfo.after}
          <AfterInfo info={line.nfo.after} />
        {/if}
      </div>
      </div>

      {#if line.nfo && line.nfo.msg}
        <div class="log-line-info">{line.txt}</div>
      {:else}
        <div class="log-line-txt">{line.txt}</div>
      {/if}

    </div>
  {/each}
{/if}

<style>
  .log-line {
    --mark-size: 64px;
  }
  .log-line-info,
  .log-line-txt {
    width: calc(100% - var(--mark-size));
    overflow: scroll;
  }
  .log-mark-cont {
    font-size: 0.8em;
    width: var(--mark-size);
    margin: 12px;
  }
  .log-mark {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .log-mark input {
    display: block;
  }
  .log-line,
  .log-line.plain {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    color: #444;
    margin-top: 1em;
    padding-top: 0.5em;

    padding-bottom: 16px;
    box-shadow: 0px 1px 0px #e2d8f3;
  }
  .log-line.compact,
  .log-line.plain {
    margin-top: 0.5em;
  }
  .log-line.plain {
    font-size: 0.9em;
    background: #efefef;
  }
  .log-name {
    text-align: right;
    margin-bottom: 12px;
    margin-right: 1em;
    font-weight: bold;
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
