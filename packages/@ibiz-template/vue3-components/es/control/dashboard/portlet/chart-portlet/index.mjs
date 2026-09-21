import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ChartPortlet } from './chart-portlet.mjs';
import { ChartPortletProvider } from './chart-portlet.provider.mjs';

"use strict";
const IBizChartPortlet = withInstall(ChartPortlet, function(v) {
  v.component(ChartPortlet.name, ChartPortlet);
  registerPortletProvider("CHART", () => new ChartPortletProvider());
});

export { ChartPortlet, IBizChartPortlet, IBizChartPortlet as default };
