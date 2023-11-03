// modified from: https://svelte.dev/repl/e6c0e3db7d064d43a7e4559b2862e1f7?version=3.48.0
import { writable } from 'svelte/store'

export function storable(name, data) {
   const store = writable(data);
   const { subscribe, set, update } = store;
   const localStorageAvailable = localStorage && localStorage.getItem;
   name = `logviewer.${name}`;

   if(localStorageAvailable) {
      try {
         set(JSON.parse(localStorage.getItem(name)));
      } catch(e) {/* ignore */}
   }

   return {
      subscribe,
      set: n => {
         localStorageAvailable && localStorage.setItem(name, JSON.stringify(n));
         set(n);
      },
      update: cb => {
         const updatedStore = cb(get(store));

         localStorageAvailable && localStorage.setItem(name, JSON.stringify(n));
         set(updatedStore);
      }
   };
}
