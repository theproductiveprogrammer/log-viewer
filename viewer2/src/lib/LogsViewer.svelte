<script>
  import { slide } from 'svelte/transition';
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

  import { current_log,log_fetching, log_fetching_error } from '../stores.js';
  import makeLog, { newLog } from '../log-fns.js';
  import LoadingMessages from './LoadingMessages.svelte';
  import { loadingLogs } from '../messages.js';
  import LogViewer from './LogViewer.svelte';
  import ToolBar from './ToolBar.svelte';

  import LogViewerBg from '../assets/log-viewer-bg.svelte';

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    if(!acceptedFiles || !acceptedFiles.length) return;
    const f = acceptedFiles[0];
    const name = f.name;
    const id = `clipboard|${f.name}`;

    $log_fetching = true;
    const txt = await f.text();
    const source = { name, id }
    const log = newLog(source);
    try {
      await makeLog(source.name, null, txt, log);
      $current_log = log;
      $log_fetching = false;
    } catch(e) {
      console.error(e);
      $log_fetching = false;
    }
  }

</script>

{#key $current_log}
<ToolBar />
{/key}

{#if $log_fetching}
  <LoadingMessages messages={loadingLogs} />
{/if}
{#if $log_fetching_error}
  <div class="log-error" in:slide>Error: {$log_fetching_error.message}</div>
{/if}
<Dropzone on:drop={handleFilesSelect} accept=".log,.txt">
{#if $current_log}
  <LogViewer />
{:else}
  <div class="bg">
    <LogViewerBg />
  </div>
{/if}
</Dropzone>

<style>
  .log-error {
    width: 100%;
    background: #fdd;
    text-align: center;
    color: red;
    border: 1px solid #ccc;
    padding: 8px;
  }
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 100px);
    opacity: 0.16;
  }
</style>
