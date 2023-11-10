import { writable } from 'svelte/store';
import { storable } from './storable.js';

export const current_log = writable(null);
export const log_fetching = writable(false);
export const log_fetching_error = writable(null);
export const refresh = writable(null);

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

export function makeSelections() {
  let selections = [];
  const { subscribe, set, update } = writable(selections);

  const add = v => {
    selections = [...selections, v];
    update(s => selections);
  };
  const rm = v => {
    selections = selections.filter(v_ => v_ != v);
    update(s => selections);
  };
  const contains = v => {
    return selections.indexOf(v) != -1;
  };

  return {
    subscribe,
    add,
    rm,
    contains,
  };
}
