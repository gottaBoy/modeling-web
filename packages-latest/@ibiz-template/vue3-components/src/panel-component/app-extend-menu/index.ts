import { App } from 'vue';
import { CommonExtendMenu } from './extend-menu-base/common-extend-menu/common-extend-menu';
import IBizLeftSideMenu from './left-side-menu';
import IBizRightSideMenu from './right-side-menu';
import IBizBottomSideMenu from './bottom-side-menu';
import IBizTopSideMenu from './top-side-menu';

export default {
  install(app: App): void {
    app.component(CommonExtendMenu.name!, CommonExtendMenu);
    app.use(IBizLeftSideMenu);
    app.use(IBizRightSideMenu);
    app.use(IBizBottomSideMenu);
    app.use(IBizTopSideMenu);
  },
};
