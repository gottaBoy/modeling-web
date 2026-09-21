import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { RightSideMenu } from './right-side-menu.mjs';
import { RightSideMenuProvider } from './right-side-menu.provider.mjs';

"use strict";
var IBizRightSideMenu = {
  install(app) {
    app.component(RightSideMenu.name, RightSideMenu);
    registerPanelItemProvider(
      "RAWITEM_PREDEFINE_RIGHT_SIDE_MENU",
      () => new RightSideMenuProvider()
    );
  }
};

export { IBizRightSideMenu as default };
