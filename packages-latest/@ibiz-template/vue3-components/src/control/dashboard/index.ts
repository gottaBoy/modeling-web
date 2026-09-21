import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { DashboardControl } from './dashboard';
import { DashboardDesign } from './dashboard-design/dashboard-design';
import { CustomDashboardContainer } from './custom-dashboard-container/custom-dashboard-container';
import { DashboardProvider } from './dashboard.provider';
import {
  IBizContainerPortlet,
  IBizMenuPortlet,
  IBizViewPortlet,
  PortletLayout,
  IBizChartPortlet,
  IBizRawItemPortlet,
  IBizListPortlet,
  IBizHtmlPortlet,
  IBizActionBarPortlet,
  IBizReportPortlet,
  IBizFilterPortlet,
} from './portlet';

export * from './portlet';

export const IBizDashboardControl = withInstall(
  DashboardControl,
  function (v: App) {
    v.component(DashboardControl.name, DashboardControl);
    v.component(DashboardDesign.name, DashboardDesign);
    v.component(CustomDashboardContainer.name, CustomDashboardContainer);
    registerControlProvider(
      ControlType.DASHBOARD,
      () => new DashboardProvider(),
    );
    v.component(PortletLayout.name, PortletLayout);
    v.use(IBizContainerPortlet);
    v.use(IBizViewPortlet);
    v.use(IBizMenuPortlet);
    v.use(IBizChartPortlet);
    v.use(IBizRawItemPortlet);
    v.use(IBizListPortlet);
    v.use(IBizHtmlPortlet);
    v.use(IBizActionBarPortlet);
    v.use(IBizReportPortlet);
    v.use(IBizFilterPortlet);
  },
);

export default IBizDashboardControl;
