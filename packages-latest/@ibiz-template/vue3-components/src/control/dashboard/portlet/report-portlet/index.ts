import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ReportPortlet } from './report-portlet';
import { ReportPortletProvider } from './report-portlet.provider';

export * from './report-portlet';

export const IBizReportPortlet = withInstall(ReportPortlet, function (v: App) {
  v.component(ReportPortlet.name!, ReportPortlet);
  registerPortletProvider('REPORT', () => new ReportPortletProvider());
});

export default IBizReportPortlet;
