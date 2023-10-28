<script>
import { onMount } from 'svelte';
import { typewriter } from '../animations/typewriter.js';

/*    way/
 * shows the messages in a nice typing animation, one after another
 * and tacks some dots to the ending message to keep the animation
 * going
 */
export let messages;

export let dots = "";

let done;
let stop;
let i = -1;
function loop() {
  if(stop) return;

  if(done) {
    if(!dots.endsWith(".")) dots = "....";
    else dots = "";
  } else {
    i += 1;
    done = i == messages.length;
  }

  setTimeout(loop, done ? 1000 : 2500);
}

onMount(() => {
  loop();
  return () => stop = true;
});
</script>

<div class="loading-message-cont">
<div class="loading-message">
{#if !done}
{#key i}
  <span in:typewriter={{ speed: 5 }}>
    {messages[i] || ''}
  </span>
{/key}
{:else}
  {#key dots}
  {messages[messages.length-1]}<span in:typewriter={{ speed: 1 }}>{dots}</span>
  {/key}
{/if}
</div>
</div>

<style>
  .loading-message-cont {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background: rgba(9,9,9,0.1);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .loading-message {
    padding-left: 1em;
    min-width: 256px;
    height: 64px;
    line-height: 64px;
    border-radius: 2px;
    background: #333;
    color: #eef;
  }
</style>
