import { writable } from 'svelte/store';

export const current_log = writable(null);
export const log_fetching = writable(false);
export const log_fetching_error = writable(null);

export function makeCompact() {
  return new writable(false);
}

export function makeNumlines() {
  return new writable(24);
}

export function makeFilters() {
  return new writable([]);
}
