import { writable } from 'svelte/store';

function createSources() {

  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    update,
  }

}

export const sources = createSources();
export const serverURL = writable("");
