import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ListPortlet } from './list-portlet.mjs';
import { ListPortletProvider } from './list-portlet.provider.mjs';

"use strict";
const IBizListPortlet = withInstall(ListPortlet, function(v) {
  v.component(ListPortlet.name, ListPortlet);
  registerPortletProvider("LIST", () => new ListPortletProvider());
});

export { IBizListPortlet, ListPortlet, IBizListPortlet as default };
