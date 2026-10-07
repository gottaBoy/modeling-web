import { registerUIActionProvider } from '@ibiz-template/runtime';
import { ModelEditProvider } from './provider';

export { ModelEditProvider } from './provider';
export { ModelEditView } from './view';
export { ModelEditSession } from './session';
export { MonacoSurface, monacoBaseUrl } from './monaco';

export default {
  install(): void {
    registerUIActionProvider('DEUIACTION_MODEL_EDIT', () => new ModelEditProvider());
  },
};
