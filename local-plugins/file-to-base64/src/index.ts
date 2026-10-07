import type { App, Plugin } from 'vue';
import { registerEditorProvider } from '@ibiz-template/runtime';
import { AIBizFileToBase64 } from './editor';
import { COMPONENT_NAME, FileToBase64Provider, PROVIDER_KEY } from './provider';

export { AIBizFileToBase64 } from './editor';
export { FileToBase64Controller } from './controller';
export { COMPONENT_NAME, FileToBase64Provider, PROVIDER_KEY } from './provider';
export * from './file-logic';

const plugin: Plugin = {
  install(app: App): void {
    app.component(COMPONENT_NAME, AIBizFileToBase64);
    registerEditorProvider(PROVIDER_KEY, () => new FileToBase64Provider());
  },
};

export default plugin;
