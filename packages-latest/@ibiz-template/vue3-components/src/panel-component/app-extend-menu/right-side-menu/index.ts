import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { RightSideMenu } from './right-side-menu';
import { RightSideMenuProvider } from './right-side-menu.provider';

export default {
  install(app: App): void {
    // 注册组件
    app.component(RightSideMenu.name!, RightSideMenu);
    registerPanelItemProvider(
      'RAWITEM_PREDEFINE_RIGHT_SIDE_MENU',
      () => new RightSideMenuProvider(),
    );
  },
};
