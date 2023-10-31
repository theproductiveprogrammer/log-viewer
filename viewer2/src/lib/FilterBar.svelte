<script>
  import { addFilter, setSearch } from '../log-fns.js';

  export let log;

  let hide;
  let keep;

  function filter() {
    setSearch(null, log);
    addFilter('-', hide, log);
    addFilter('+', keep, log);
    hide = "";
    keep = "";
  }

  function enterH(e) {
    if(e.key === 'Enter') filter();
  }

  let searcher;
  function search(e) {
    if(searcher) clearTimeout(searcher);
    const v = e.target.value || "";
    const tm = v.length > 2 ? 500 : 1500;
    searcher = setTimeout(() => setSearch(v, log), tm);
  }
</script>


<div class="log-search-bar">
  <div>Hide: <input type="text" bind:value={hide} on:keydown={enterH} on:keyup={search}></div>
  <div>Keep: <input type="text" bind:value={keep} on:keydown={enterH} on:keyup={search}></div>
  <button on:click={filter}>Go</button>
</div>

<style>
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
  .log-search-bar {
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
  }
  .log-search-bar div {
    margin-left: 1em;
  }
  .log-search-bar input {
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    width: 6em;
    font-size: 0.9em;
  }
</style>
