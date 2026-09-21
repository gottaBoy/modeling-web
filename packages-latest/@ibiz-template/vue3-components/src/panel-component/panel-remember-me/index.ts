import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelRememberMe } from './panel-remember-me';
import { PanelRememberMeProvider } from './panel-remember-me.provider';
import { PanelRememberMeState } from './panel-remember-me.state';
import { PanelRememberMeController } from './panel-remember-me.controller';

export { PanelRememberMeState, PanelRememberMeController };

export const IBizPanelRememberMe = withInstall(
  PanelRememberMe,
  function (v: App) {
    v.component(PanelRememberMe.name, PanelRememberMe);
    registerPanelItemProvider(
      'CONTAINER_REMEMBER_ME',
      () => new PanelRememberMeProvider(),
    );
    registerPanelItemProvider(
      'FIELD_AUTH_REMEMBERME',
      () => new PanelRememberMeProvider(),
    );
  },
);

export default IBizPanelRememberMe;
