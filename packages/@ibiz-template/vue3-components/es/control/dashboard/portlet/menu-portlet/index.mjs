import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { AppMenuPortletControl } from './app-menu-portlet/app-menu-portlet.mjs';
import { MenuPortlet } from './menu-portlet.mjs';
import { MenuPortletProvider } from './menu-portlet.provider.mjs';

"use strict";
const IBizMenuPortlet = withInstall(MenuPortlet, function(v) {
  v.component(MenuPortlet.name, MenuPortlet);
  v.component(AppMenuPortletControl.name, AppMenuPortletControl);
  registerPortletProvider("APPMENU", () => new MenuPortletProvider());
});

export { IBizMenuPortlet, MenuPortlet, IBizMenuPortlet as default };
