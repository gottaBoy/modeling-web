import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelAppLoginView } from './panel-app-login-view.mjs';
import { PanelAppLoginViewProvider } from './panel-app-login-view.provider.mjs';
export { PanelAppLoginViewState } from './panel-app-login-view.state.mjs';
export { PanelAppLoginViewController } from './panel-app-login-view.controller.mjs';

"use strict";
const IBizPanelAppLoginView = withInstall(
  PanelAppLoginView,
  function(v) {
    v.component(PanelAppLoginView.name, PanelAppLoginView);
    registerPanelItemProvider(
      "CONTAINER_APPLOGINVIEW",
      () => new PanelAppLoginViewProvider()
    );
  }
);

export { IBizPanelAppLoginView, IBizPanelAppLoginView as default };
