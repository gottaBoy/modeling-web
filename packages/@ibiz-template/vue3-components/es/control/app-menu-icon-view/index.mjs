import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppMenuIconViewProvider } from './app-menu-icon-view.provider.mjs';
import { AppMenuIconViewControl } from './app-menu-icon-view.mjs';

"use strict";
const IBizAppMenuIconViewControl = withInstall(
  AppMenuIconViewControl,
  function(v) {
    v.component(AppMenuIconViewControl.name, AppMenuIconViewControl);
    registerControlProvider(
      "".concat(ControlType.APP_MENU, "_ICONVIEW"),
      () => new AppMenuIconViewProvider()
    );
  }
);

export { IBizAppMenuIconViewControl, IBizAppMenuIconViewControl as default };
