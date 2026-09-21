import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppSwitch } from './app-switch.mjs';
import { AppSwitchProvider } from './app-switch.provider.mjs';

"use strict";
const IBizAppSwitch = withInstall(
  AppSwitch,
  function(v) {
    v.component(AppSwitch.name, AppSwitch);
    registerPanelItemProvider(
      "RAWITEM_APP_SWITCH",
      () => new AppSwitchProvider()
    );
  }
);

export { IBizAppSwitch, IBizAppSwitch as default };
