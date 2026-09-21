import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { AppSwitch } from './app-switch';
import { AppSwitchProvider } from './app-switch.provider';

export const IBizAppSwitch: ReturnType<typeof withInstall> = withInstall(
  AppSwitch,
  function (v: App) {
    v.component(AppSwitch.name!, AppSwitch);
    registerPanelItemProvider(
      'RAWITEM_APP_SWITCH',
      () => new AppSwitchProvider(),
    );
  },
);

export default IBizAppSwitch;
