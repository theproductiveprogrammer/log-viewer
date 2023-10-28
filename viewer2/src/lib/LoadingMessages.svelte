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
