import { writable } from 'svelte/store';

export const current = writable({
  fetching: false,
  error: null,
  log: null,
});
