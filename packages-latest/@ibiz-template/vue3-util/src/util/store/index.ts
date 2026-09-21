import { createPinia } from 'pinia';

export * from './app-store/app-store';
export * from './ui-store/ui-store';

export const piniaInstance = createPinia();
