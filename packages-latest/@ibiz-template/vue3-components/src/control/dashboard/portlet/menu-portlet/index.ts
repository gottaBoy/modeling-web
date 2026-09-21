import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { AppMenuPortletControl } from './app-menu-portlet/app-menu-portlet';
import { MenuPortlet } from './menu-portlet';
import { MenuPortletProvider } from './menu-portlet.provider';

export * from './menu-portlet';

export const IBizMenuPortlet = withInstall(MenuPortlet, function (v: App) {
  v.component(MenuPortlet.name, MenuPortlet);
  v.component(AppMenuPortletControl.name, AppMenuPortletControl);
  // 菜单
  registerPortletProvider('APPMENU', () => new MenuPortletProvider());
});

export default IBizMenuPortlet;
