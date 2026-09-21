import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FilterPortlet } from './filter-portlet.mjs';
import { FilterPortletProvider } from './filter-portlet.provider.mjs';
import { IBizFilterPortletDesign } from './filter-portlet-design/filter-portlet-design.mjs';

"use strict";
const IBizFilterPortlet = withInstall(FilterPortlet, function(v) {
  v.component(FilterPortlet.name, FilterPortlet);
  v.component(IBizFilterPortletDesign.name, IBizFilterPortletDesign);
  registerPortletProvider("FILTER", () => new FilterPortletProvider());
});

export { FilterPortlet, IBizFilterPortlet, IBizFilterPortlet as default };
