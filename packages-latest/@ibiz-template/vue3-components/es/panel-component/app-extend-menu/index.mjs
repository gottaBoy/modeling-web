import { CommonExtendMenu } from './extend-menu-base/common-extend-menu/common-extend-menu.mjs';
import IBizLeftSideMenu from './left-side-menu/index.mjs';
import IBizRightSideMenu from './right-side-menu/index.mjs';
import IBizBottomSideMenu from './bottom-side-menu/index.mjs';
import IBizTopSideMenu from './top-side-menu/index.mjs';

"use strict";
var IBizAppExtendMenu = {
  install(app) {
    app.component(CommonExtendMenu.name, CommonExtendMenu);
    app.use(IBizLeftSideMenu);
    app.use(IBizRightSideMenu);
    app.use(IBizBottomSideMenu);
    app.use(IBizTopSideMenu);
  }
};

export { IBizAppExtendMenu as default };
