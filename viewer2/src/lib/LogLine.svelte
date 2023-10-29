<script>
  import { hasNfo } from '../log-fns.js';
  import AfterInfo from './AfterInfo.svelte';

  export let line;
</script>

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
    <div class="log-line-info">{line.nfo.msg}</div>
  {:else}
    <div class="log-line-txt">{line.txt}</div>
  {/if}

</div>

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
    margin: 0 12px;
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
    padding: 8px 0;
    box-shadow: 0px 0px 1px #e2d8f3;
  }
  .log-line.compact,
  .log-line.plain {
    margin-top: 0.5em;
  }
  .log-line.plain {
    font-size: 0.9em;
    background: #efefef;
  }
</style>
