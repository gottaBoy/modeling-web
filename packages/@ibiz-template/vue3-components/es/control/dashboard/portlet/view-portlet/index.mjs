import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ViewPortlet } from './view-portlet.mjs';
import { ViewPortletProvider } from './view-portlet.provider.mjs';

"use strict";
const IBizViewPortlet = withInstall(ViewPortlet, function(v) {
  v.component(ViewPortlet.name, ViewPortlet);
  registerPortletProvider("VIEW", () => new ViewPortletProvider());
});

export { IBizViewPortlet, ViewPortlet, IBizViewPortlet as default };
