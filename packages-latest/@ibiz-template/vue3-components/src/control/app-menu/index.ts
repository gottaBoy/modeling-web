import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppMenuControl } from './app-menu';
import { AppMenuProvider } from './app-menu.provider';
import { MenuDesign } from './custom-menu-design/custom-menu-design';

export const IBizAppMenuControl = withInstall(
  AppMenuControl,
  function (v: App) {
    v.component(MenuDesign.name, MenuDesign);
    v.component(AppMenuControl.name, AppMenuControl);
    registerControlProvider(ControlType.APP_MENU, () => new AppMenuProvider());
  },
);

export default IBizAppMenuControl;
