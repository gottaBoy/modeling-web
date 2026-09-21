import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { LeftSideMenu } from './left-side-menu.mjs';
import { LeftSideMenuProvider } from './left-side-menu.provider.mjs';

"use strict";
var IBizLeftSideMenu = {
  install(app) {
    app.component(LeftSideMenu.name, LeftSideMenu);
    registerPanelItemProvider(
      "RAWITEM_PREDEFINE_LEFT_SIDE_MENU",
      () => new LeftSideMenuProvider()
    );
  }
};

export { IBizLeftSideMenu as default };
