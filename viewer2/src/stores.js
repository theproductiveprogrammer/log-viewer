import { writable } from 'svelte/store';
import { storable } from './storable.js';

export const current_log = writable(null);
export const log_fetching = writable(false);
export const log_fetching_error = writable(null);

export function makeNumlines() {
  return new writable(24);
}

export function makeFilters() {
  return new writable([]);
}

export function makeSearch() {
  return new writable("");
}

export const open_sources = writable(false);
export const top_line = writable(null);

export const auth = storable('auth', null);
export const compact = storable('compact', false);
