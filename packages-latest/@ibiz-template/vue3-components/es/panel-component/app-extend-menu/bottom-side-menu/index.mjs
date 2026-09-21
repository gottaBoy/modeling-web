import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { BottomSideMenu } from './bottom-side-menu.mjs';
import { BottomSideMenuProvider } from './bottom-side-menu.provider.mjs';

"use strict";
var IBizBottomSideMenu = {
  install(app) {
    app.component(BottomSideMenu.name, BottomSideMenu);
    registerPanelItemProvider(
      "RAWITEM_PREDEFINE_BOTTOM_SIDE_MENU",
      () => new BottomSideMenuProvider()
    );
  }
};

export { IBizBottomSideMenu as default };
