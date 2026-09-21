import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelRememberMe } from './panel-remember-me.mjs';
import { PanelRememberMeProvider } from './panel-remember-me.provider.mjs';
export { PanelRememberMeState } from './panel-remember-me.state.mjs';
export { PanelRememberMeController } from './panel-remember-me.controller.mjs';

"use strict";
const IBizPanelRememberMe = withInstall(
  PanelRememberMe,
  function(v) {
    v.component(PanelRememberMe.name, PanelRememberMe);
    registerPanelItemProvider(
      "CONTAINER_REMEMBER_ME",
      () => new PanelRememberMeProvider()
    );
    registerPanelItemProvider(
      "FIELD_AUTH_REMEMBERME",
      () => new PanelRememberMeProvider()
    );
  }
);

export { IBizPanelRememberMe, IBizPanelRememberMe as default };
