<script>
  export let info;

  function tm(info) {
    let i = [];
    if(info.hours) i.push(`${info.hours}h`);
    if(info.minutes) i.push(`${info.minutes}m`);
    if(info.seconds) {
      if(info.milliseconds) {
        i.push(`${info.seconds + (info.milliseconds/1000).toFixed(3)}s`);
      } else {
        i.push(`${info.seconds}s`);
      }
    } else {
      if(info.milliseconds) i.push(`${(info.milliseconds/1000).toFixed(3)}`);
    }
    return "+"+i.join(" ");
  }

</script>

<div class="log-after-info">
  {#if info.hours}
    <div class="log-after-hours">{tm(info)}</div>
  {:else if info.minutes}
    <div class="log-after-mins">{tm(info)}</div>
  {:else if info.seconds}
    <div class="log-after-secs">{tm(info)}</div>
  {:else if info.milliseconds}
    <div class="log-after-ms">{tm(info)}</div>
  {/if}
</div>

<style>
  .log-after-info {
    text-align: center;
    margin: 4px;
  }
  .log-after-ms {
    font-size: 0.7em;
    color: #aac;
  }
  .log-after-secs {
    font-size: 0.8em;
    color: #779;
  }
  .log-after-mins {
    font-size: 1em;
    font-weight: bold;
    color: #933;
  }
  .log-after-hours {
    font-size: 1.2em;
    font-weight: bold;
    color: #900;
  }
</style>
