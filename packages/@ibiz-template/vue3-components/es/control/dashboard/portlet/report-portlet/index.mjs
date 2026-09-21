import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ReportPortlet } from './report-portlet.mjs';
import { ReportPortletProvider } from './report-portlet.provider.mjs';

"use strict";
const IBizReportPortlet = withInstall(ReportPortlet, function(v) {
  v.component(ReportPortlet.name, ReportPortlet);
  registerPortletProvider("REPORT", () => new ReportPortletProvider());
});

export { IBizReportPortlet, ReportPortlet, IBizReportPortlet as default };
