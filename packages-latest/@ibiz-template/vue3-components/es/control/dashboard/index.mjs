import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { DashboardControl } from './dashboard.mjs';
import { DashboardDesign } from './dashboard-design/dashboard-design.mjs';
import { CustomDashboardContainer } from './custom-dashboard-container/custom-dashboard-container.mjs';
import { DashboardProvider } from './dashboard.provider.mjs';
import './portlet/index.mjs';
import { PortletLayout } from './portlet/portlet-layout/portlet-layout.mjs';
import { IBizContainerPortlet } from './portlet/container-portlet/index.mjs';
import { IBizViewPortlet } from './portlet/view-portlet/index.mjs';
import { IBizMenuPortlet } from './portlet/menu-portlet/index.mjs';
import { IBizChartPortlet } from './portlet/chart-portlet/index.mjs';
import { IBizRawItemPortlet } from './portlet/rawitem-portlet/index.mjs';
import { IBizListPortlet } from './portlet/list-portlet/index.mjs';
import { IBizHtmlPortlet } from './portlet/html-portlet/index.mjs';
import { IBizActionBarPortlet } from './portlet/actionbar-portlet/index.mjs';
import { IBizReportPortlet } from './portlet/report-portlet/index.mjs';
import { IBizFilterPortlet } from './portlet/filter-portlet/index.mjs';
export { ContainerPortlet } from './portlet/container-portlet/container-portlet.mjs';
export { ViewPortlet } from './portlet/view-portlet/view-portlet.mjs';
export { MenuPortlet } from './portlet/menu-portlet/menu-portlet.mjs';
export { ChartPortlet } from './portlet/chart-portlet/chart-portlet.mjs';
export { RawItemPortlet } from './portlet/rawitem-portlet/rawitem-portlet.mjs';
export { ListPortlet } from './portlet/list-portlet/list-portlet.mjs';
export { HtmlPortlet } from './portlet/html-portlet/html-portlet.mjs';
export { ActionBarPortlet } from './portlet/actionbar-portlet/actionbar-portlet.mjs';
export { ReportPortlet } from './portlet/report-portlet/report-portlet.mjs';
export { FilterPortlet } from './portlet/filter-portlet/filter-portlet.mjs';

"use strict";
const IBizDashboardControl = withInstall(
  DashboardControl,
  function(v) {
    v.component(DashboardControl.name, DashboardControl);
    v.component(DashboardDesign.name, DashboardDesign);
    v.component(CustomDashboardContainer.name, CustomDashboardContainer);
    registerControlProvider(
      ControlType.DASHBOARD,
      () => new DashboardProvider()
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
  }
);

export { IBizActionBarPortlet, IBizChartPortlet, IBizContainerPortlet, IBizDashboardControl, IBizFilterPortlet, IBizHtmlPortlet, IBizListPortlet, IBizMenuPortlet, IBizRawItemPortlet, IBizReportPortlet, IBizViewPortlet, PortletLayout, IBizDashboardControl as default };
