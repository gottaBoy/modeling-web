import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppMenuIconViewProvider } from './app-menu-icon-view.provider';
import { AppMenuIconViewControl } from './app-menu-icon-view';

export const IBizAppMenuIconViewControl = withInstall(
  AppMenuIconViewControl,
  function (v: App) {
    v.component(AppMenuIconViewControl.name, AppMenuIconViewControl);
    registerControlProvider(
      `${ControlType.APP_MENU}_ICONVIEW`,
      () => new AppMenuIconViewProvider(),
    );
  },
);

export default IBizAppMenuIconViewControl;
