import { createPinia } from 'pinia';
export { useAppStore } from './app-store/app-store.mjs';
export { useUIStore } from './ui-store/ui-store.mjs';

"use strict";
const piniaInstance = createPinia();

export { piniaInstance };
