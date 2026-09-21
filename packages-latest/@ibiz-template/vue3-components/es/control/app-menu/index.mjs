import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppMenuControl } from './app-menu.mjs';
import { AppMenuProvider } from './app-menu.provider.mjs';
import { MenuDesign } from './custom-menu-design/custom-menu-design.mjs';

"use strict";
const IBizAppMenuControl = withInstall(
  AppMenuControl,
  function(v) {
    v.component(MenuDesign.name, MenuDesign);
    v.component(AppMenuControl.name, AppMenuControl);
    registerControlProvider(ControlType.APP_MENU, () => new AppMenuProvider());
  }
);

export { IBizAppMenuControl, IBizAppMenuControl as default };
