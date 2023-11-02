<script>
  import OpenIcon from '../assets/open.svelte';

</script>

<div class="log-toolbar-open">
  <OpenIcon />
</div>

<style>
  .log-toolbar-open {
    opacity: 0.5;
    cursor: pointer;
    margin-right: 1em;
    transition: transform 500ms ease-in-out;
  }
  .log-toolbar-open:hover {
    opacity: 0.5;
    transform: scale(1.2);
  }
</style>
