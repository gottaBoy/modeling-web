'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var dashboard = require('./dashboard.cjs');
var dashboardDesign = require('./dashboard-design/dashboard-design.cjs');
var customDashboardContainer = require('./custom-dashboard-container/custom-dashboard-container.cjs');
var dashboard_provider = require('./dashboard.provider.cjs');
require('./portlet/index.cjs');
var portletLayout = require('./portlet/portlet-layout/portlet-layout.cjs');
var index = require('./portlet/container-portlet/index.cjs');
var index$1 = require('./portlet/view-portlet/index.cjs');
var index$2 = require('./portlet/menu-portlet/index.cjs');
var index$3 = require('./portlet/chart-portlet/index.cjs');
var index$4 = require('./portlet/rawitem-portlet/index.cjs');
var index$5 = require('./portlet/list-portlet/index.cjs');
var index$6 = require('./portlet/html-portlet/index.cjs');
var index$7 = require('./portlet/actionbar-portlet/index.cjs');
var index$8 = require('./portlet/report-portlet/index.cjs');
var index$9 = require('./portlet/filter-portlet/index.cjs');
var containerPortlet = require('./portlet/container-portlet/container-portlet.cjs');
var viewPortlet = require('./portlet/view-portlet/view-portlet.cjs');
var menuPortlet = require('./portlet/menu-portlet/menu-portlet.cjs');
var chartPortlet = require('./portlet/chart-portlet/chart-portlet.cjs');
var rawitemPortlet = require('./portlet/rawitem-portlet/rawitem-portlet.cjs');
var listPortlet = require('./portlet/list-portlet/list-portlet.cjs');
var htmlPortlet = require('./portlet/html-portlet/html-portlet.cjs');
var actionbarPortlet = require('./portlet/actionbar-portlet/actionbar-portlet.cjs');
var reportPortlet = require('./portlet/report-portlet/report-portlet.cjs');
var filterPortlet = require('./portlet/filter-portlet/filter-portlet.cjs');

"use strict";
const IBizDashboardControl = vue3Util.withInstall(
  dashboard.DashboardControl,
  function(v) {
    v.component(dashboard.DashboardControl.name, dashboard.DashboardControl);
    v.component(dashboardDesign.DashboardDesign.name, dashboardDesign.DashboardDesign);
    v.component(customDashboardContainer.CustomDashboardContainer.name, customDashboardContainer.CustomDashboardContainer);
    runtime.registerControlProvider(
      runtime.ControlType.DASHBOARD,
      () => new dashboard_provider.DashboardProvider()
    );
    v.component(portletLayout.PortletLayout.name, portletLayout.PortletLayout);
    v.use(index.IBizContainerPortlet);
    v.use(index$1.IBizViewPortlet);
    v.use(index$2.IBizMenuPortlet);
    v.use(index$3.IBizChartPortlet);
    v.use(index$4.IBizRawItemPortlet);
    v.use(index$5.IBizListPortlet);
    v.use(index$6.IBizHtmlPortlet);
    v.use(index$7.IBizActionBarPortlet);
    v.use(index$8.IBizReportPortlet);
    v.use(index$9.IBizFilterPortlet);
  }
);

exports.PortletLayout = portletLayout.PortletLayout;
exports.IBizContainerPortlet = index.IBizContainerPortlet;
exports.IBizViewPortlet = index$1.IBizViewPortlet;
exports.IBizMenuPortlet = index$2.IBizMenuPortlet;
exports.IBizChartPortlet = index$3.IBizChartPortlet;
exports.IBizRawItemPortlet = index$4.IBizRawItemPortlet;
exports.IBizListPortlet = index$5.IBizListPortlet;
exports.IBizHtmlPortlet = index$6.IBizHtmlPortlet;
exports.IBizActionBarPortlet = index$7.IBizActionBarPortlet;
exports.IBizReportPortlet = index$8.IBizReportPortlet;
exports.IBizFilterPortlet = index$9.IBizFilterPortlet;
exports.ContainerPortlet = containerPortlet.ContainerPortlet;
exports.ViewPortlet = viewPortlet.ViewPortlet;
exports.MenuPortlet = menuPortlet.MenuPortlet;
exports.ChartPortlet = chartPortlet.ChartPortlet;
exports.RawItemPortlet = rawitemPortlet.RawItemPortlet;
exports.ListPortlet = listPortlet.ListPortlet;
exports.HtmlPortlet = htmlPortlet.HtmlPortlet;
exports.ActionBarPortlet = actionbarPortlet.ActionBarPortlet;
exports.ReportPortlet = reportPortlet.ReportPortlet;
exports.FilterPortlet = filterPortlet.FilterPortlet;
exports.IBizDashboardControl = IBizDashboardControl;
exports.default = IBizDashboardControl;
