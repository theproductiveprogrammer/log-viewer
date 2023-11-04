<script>
  import { fade,slide } from 'svelte/transition';

  import { compact } from '../stores.js';

  import { DateTime } from 'luxon';
  import { hasNfo } from '../log-fns.js';
  import { copyToClipboard } from '../util.js';
  import AfterInfo from './AfterInfo.svelte';
  import ShowException from './ShowException.svelte';

  import JSONTree from 'svelte-json-tree';

  export let line;
  export let view;

  let raw = false;
  $: full = ! $compact;

  let found;
  let notfound;
  view.search.subscribe(s => {
    found = line.found === true;
    notfound = line.found === false;
  });

  function toggleRaw() {
    raw = !raw;
    copyToClipboard(line.orig?line.orig:line.txt);
  }

  function handleSel(e) {
    const checkbox = e.target;
    if(checkbox.checked) view.selections.add(line.num);
    else view.selections.rm(line.num);
  }

  let selected = false;
  view.selections.subscribe(v => {
    selected = v.indexOf(line.num) != -1;
  });

</script>

<div class="log-line" 
     class:full class:found class:notfound class:plain={raw || !hasNfo(line.nfo)} class:selected
     out:slide
     role="none">
  {#if raw}
    <div class="log-line-txt-cont"
         on:dblclick|preventDefault={toggleRaw} role="none">
    <div class="log-line-txt">{line.orig?line.orig:line.txt}</div>
    </div>
  {:else}
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
      <div class="log-line-num">{line.num}</div>
      <input type="checkbox" on:change={handleSel}>
      <AfterInfo info={line.nfo && line.nfo.after} />
    </div>
  </div>

  {#if full && hasNfo(line.nfo)}

    <div class="log-line-info"
         on:dblclick|preventDefault={toggleRaw} role="none">
      <div class="log-line-msg">
        {#if line.nfo.exception }
          <ShowException msg={line.nfo.msg} exception={line.nfo.exception} />
        {:else}
          {line.nfo.msg}
        {/if}
        {#if line.nfo.json}
          <div class="log-json-tree">
            <JSONTree defaultExpandedLevel=1 value={line.nfo.json} />
          </div>
        {/if}
      </div>

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
    <div class="log-line-txt" on:dblclick|preventDefault={toggleRaw} role="none">
      <span class="log-line-plain-msg">
        {#if line.nfo.exception }
          <ShowException msg={line.nfo.msg} exception={line.nfo.exception} />
        {:else}
          {line.nfo.msg}
        {/if}
      </span>
      {#if line.nfo.json}
        <div class="log-json-tree">
          <JSONTree defaultExpandedLevel=0 value={line.nfo.json} />
        </div>
      {/if}
      {#if line.nfo.date}
      <span class="log-line-plain-dt">{line.nfo.date.toLocaleString(DateTime.DATETIME_FULL)}</span>
      {/if}
      <span class="log-line-plain-src">{line.nfo.source}</span>
    </div>
  {/if}
  {/if}

</div>

<style>
  .selected {
    background: #ccc;
  }
  .log-line-plain-dt,
  .log-line-plain-src {
    font-size: 0.8em;
    color: #999;
  }
  .log-json-tree {
    --json-tree-font-size: 13px;
    --json-tree-font-family: Inter, system-ui, Avenir, Helvetica, Arial, 'Courier New', Courier, monospace;
  }
  .log-line {
    --mark-size: 64px;
    --meta-size: 120px;
    font-size: 13px;
    font-weight: 400;
  }
  .log-line.full {
    font-size: 14px;
  }
  .log-line-info,
  .log-line-txt {
    width: calc(100% - var(--mark-size) - var(--meta-size));
    overflow: scroll;
  }
  .log-line.plain .log-line-txt {
    width: 100%;
    overflow: auto;
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
    font-size: 0.9em;
    background: #efefef;
    white-space: pre-wrap;
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
  .log-line-txt-cont {
    padding-bottom: 4px;
    padding-left: 8px;
    font-size: 0.9em;
  }
  .found {
    font-weight: bold;
    background: #eef;
  }
  .notfound {
    opacity: 0.5;
  }
  .log-line-num {
    font-size: 0.8em;
  }
</style>
