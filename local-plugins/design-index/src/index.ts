import { registerViewProvider } from '@ibiz-template/runtime';
import { IBizView } from '@ibiz-template/vue3-util';
import { DesignIndexController } from './controller';

export { DesignIndexController } from './controller';
export { requiredControlNames, supportedPluginCodes } from './model';

export class DesignIndexProvider {
  public readonly component = 'AibizDesignIndexView';

  public createController(model: any, context: any, params?: any, ctx?: any): DesignIndexController {
    return new DesignIndexController(model, context, params, ctx);
  }
}

export default {
  install(app: { component: (name: string, component: unknown) => unknown }): void {
    if (!IBizView || typeof app?.component !== 'function') {
      throw new Error('Design index requires the installed host IBizView and a Vue application.');
    }
    // An alias preserves the host component and does not reinstall its DEFAULT provider.
    app.component('AibizDesignIndexView', IBizView);
    registerViewProvider('VIEW_CUSTOM_DESIGN_INDEX_VIEW', () => new DesignIndexProvider());
  },
};
