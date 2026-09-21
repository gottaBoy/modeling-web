import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { TopSideMenu } from './top-side-menu.mjs';
import { TopSideMenuProvider } from './top-side-menu.provider.mjs';

"use strict";
var IBizTopSideMenu = {
  install(app) {
    app.component(TopSideMenu.name, TopSideMenu);
    registerPanelItemProvider(
      "RAWITEM_PREDEFINE_TOP_SIDE_MENU",
      () => new TopSideMenuProvider()
    );
  }
};

export { IBizTopSideMenu as default };
