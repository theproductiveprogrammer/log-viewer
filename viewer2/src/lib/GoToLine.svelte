<script>
  import { top_line } from '../stores.js';
  import { adjustNumlinesTill } from '../log-fns.js';

  export let log;
  let num;

  $: disabled = !log;

  let top_line_release = top_line.subscribe(line_num => {
    num = line_num;
  });

  function gotoLine() {
    if(disabled) return;
    if(num) adjustNumlinesTill(num, log);
  }

  function enterH(e) {
    if(e.key === 'Enter') gotoLine();
  }
</script>

<div class="log-line-goto-cont" class:disabled>
  <div class="log-line-goto-label">
    Goto line: <input type="number" {disabled} bind:value={num} on:change={gotoLine} on:keydown={enterH}/>
  </div>
  <button {disabled} on:click={gotoLine}>Go</button>
</div>

<style>
  .log-line-goto-cont {
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
  }
  .log-line-goto-cont button {
    margin-right: 1em;
  }
  button {
    border: none;
    box-shadow: 0px 0px 1px #575760;
    cursor: pointer;
    width: 3em;
    margin-left: 4px;
    transition: transform 300ms ease-in-out;
    background-color: #f9f9f9;
  }
  button:hover {
    transform: translateY(-0.5px);
    background-color: #f6f6f6;
  }
  button:active {
    transform: translateY(2px);
    background-color: #eee;
  }
  input {
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    width: 6em;
    font-size: 0.9em;
  }
  .log-line-goto-cont.disabled {
    opacity: 0.2;
  }
  .log-line-goto-cont.disabled button {
    cursor: default;
  }
</style>
