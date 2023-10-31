<script>
  export let msg;
  export let exception;
  console.log(exception);
</script>

<div class="log-viewer-exception">
  <span class="log-exception-msg">{msg}</span>
  {#each exception as ex}
    <div class="log-exception-stack">
      <span class="log-exception-at">{ex.at}</span>
      <span class="log-exception-txt">{ex.txt}</span>
    </div>
  {/each}
</div>

<style>
  .log-viewer-exception {
    background: #fff7f7;
  }
  .log-exception-msg {
    font-weight: bold;
    color: #f33;
  }
  .log-exception-stack {
    font-size: 0.7em;
  }
</style>
