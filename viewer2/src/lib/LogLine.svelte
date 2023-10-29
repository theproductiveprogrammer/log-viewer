<script>
  import { DateTime } from 'luxon';
  import { hasNfo } from '../log-fns.js';
  import AfterInfo from './AfterInfo.svelte';

  export let line;
  export let full = true;

  let raw = false;
</script>

<div class="log-line" class:plain={raw || !hasNfo(line.nfo)} on:dblclick|preventDefault={e => raw = !raw} role="none">
  {#if full && hasNfo(line.nfo)}
    <div class="log-line-hdr">
      {#if line.nfo.date}
      <div class="log-line-date">{line.nfo.date.toLocaleString(DateTime.DATETIME_FULL)}</div>
      {/if}
      {#if line.nfo.level && line.nfo.level != 'INFO'}
      <div class="log-line-level">[{line.nfo.level}]</div>
      {/if}
    </div>
  {/if}
  <div class="log-mark-cont">
    <div class="log-mark">
      <input type="checkbox">
      {#if line.nfo && line.nfo.after}
        <AfterInfo info={line.nfo.after} />
      {/if}
    </div>
  </div>

  {#if !raw && hasNfo(line.nfo)}

    <div class="log-line-info">
      <div class="log-line-msg">{line.nfo.msg}</div>

      {#if full && (line.nfo.meta || line.nfo.source) }
        <div class="log-line-footer">
          {#if line.nfo.meta && line.nfo.meta.length}
            {#each line.nfo.meta as meta}
            <div class="log-line-meta">{line.nfo.meta}</div>
            {/each}
          {/if}
          {#if line.nfo.source}
          <div class="log-line-source">{line.nfo.source}</div>
          {/if}
        </div>
      {/if}

    </div>

  {:else}
    <div class="log-line-txt">{line.txt}</div>
  {/if}

</div>

<style>
  .log-line {
    --mark-size: 64px;
    --meta-size: 120px;
    font-size: 14px;
    font-weight: 400;
  }
  .log-line-info,
  .log-line-txt {
    width: calc(100% - var(--mark-size) - var(--meta-size));
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
    padding-top: 8px;
    box-shadow: 0px 0px 1px #e2d8f3;
  }
  .log-line.plain {
    margin-top: 0.5em;
  }
  .log-line.plain {
    font-size: 0.9em;
    background: #efefef;
  }
  .log-line-hdr {
    width: var(--meta-size);
    overflow: hidden;
    font-size: 0.7em;
    text-align: right;
    margin-right: 4px;
    font-weight: 500;
    color: #99a;
  }
  .log-line-footer {
    display: flex;
    flex-direction: row;
    justify-content: right;
    justify-content: flex-end;
    font-size: 0.7em;
    text-align: right;
    margin-top: 8px;
    font-weight: 500;
    color: #99a;
    padding-right: 4px;
  }
  .log-line-source,
  .log-line-meta {
    margin-right: 4px;
  }
  .log-line .log-line-meta {
    visibility: hidden;
  }
  .log-line:hover .log-line-meta {
    visibility: visible;
  }
</style>
