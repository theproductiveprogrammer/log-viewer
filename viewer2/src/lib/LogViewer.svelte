<script>
  import { onDestroy } from 'svelte';
  import LogLine from './LogLine.svelte';
  import Toolbar from './Toolbar.svelte';

  import { current_log } from '../state.js';

  let log;
  let numlines;
  let lines;

  let numlines_release;
  let current_log_release = current_log.subscribe(v1 => {
    log = v1;
    if(numlines_release) numlines_release();
    numlines_release = log.view.numlines.subscribe(v => {
      numlines = v;
      lines = $current_log.lines.slice(-v);
    });
  });

  onDestroy((v) => {
    if(numlines_release) numlines_release();
    if(current_log_release) current_log_release();
  });
</script>

<div class="log-viewer">
  <div class="log-name">{log.src.name}</div>
  <Toolbar log={log} />
  <div class="log-viewer-lines">
  {#each lines as line (log.src.id + line.num)}
    <LogLine {line} view={log.view} />
  {/each}
  </div>
</div>

<style>
  .log-viewer-lines {
    overflow: scroll;
    height: 100vh;
  }
  .log-name {
    background: #efefff;
    text-align: center;
    padding: 8px 0;
    margin: 12px 0;
    font-weight: 600;
    font-size: 0.9em;
  }
</style>
