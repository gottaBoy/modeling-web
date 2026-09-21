import { App } from 'vue';

export * from './hooks';
export * from './common';
export * from './panel-component';
export * from './view';
export * from './control';
export * from './interface';
export * from './plugin';
export * from './use';
export * from './util';
export * from './props';
export * from './locale';

declare global {
  interface Window {
    vueInstances: Map<App, App>;
  }
}
