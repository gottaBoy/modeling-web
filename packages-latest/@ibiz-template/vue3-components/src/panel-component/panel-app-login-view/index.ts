import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelAppLoginView } from './panel-app-login-view';
import { PanelAppLoginViewProvider } from './panel-app-login-view.provider';
import { PanelAppLoginViewState } from './panel-app-login-view.state';
import { PanelAppLoginViewController } from './panel-app-login-view.controller';

export { PanelAppLoginViewState, PanelAppLoginViewController };

export const IBizPanelAppLoginView = withInstall(
  PanelAppLoginView,
  function (v: App) {
    v.component(PanelAppLoginView.name, PanelAppLoginView);
    registerPanelItemProvider(
      'CONTAINER_APPLOGINVIEW',
      () => new PanelAppLoginViewProvider(),
    );
  },
);

export default IBizPanelAppLoginView;
