import { App } from 'vue';
import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { DeRedirectView } from './de-redirect-view';
import { DeRedirectViewProvider } from './de-redirect-view.provider';

export const IBizDeRedirectView = withInstall(
  DeRedirectView,
  function (v: App) {
    v.component(DeRedirectView.name!, DeRedirectView);
    const deRedirectViewProvider = new DeRedirectViewProvider();
    registerViewProvider(
      ViewType.DE_REDIRECT_VIEW,
      () => deRedirectViewProvider,
    );
    registerViewProvider(
      ViewType.DE_MOB_REDIRECT_VIEW,
      () => deRedirectViewProvider,
    );
  },
);
