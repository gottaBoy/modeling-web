'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var reportPanel = require('./report-panel.cjs');
var reportPanel_provider = require('./report-panel.provider.cjs');
require('./report-detail/index.cjs');
var index = require('./report-detail/bi-report/index.cjs');
var index$1 = require('./report-detail/user-report-panel/index.cjs');
var index$2 = require('./report-detail/user2-report-panel/index.cjs');
var index$3 = require('./report-detail/bi-report-panel/index.cjs');

"use strict";
const IBizReportPanelControl = vue3Util.withInstall(
  reportPanel.ReportPanelControl,
  function(v) {
    v.use(index.IBizBIReport);
    v.use(index$1.IBizUserReportPanel);
    v.use(index$2.IBizUser2ReportPanel);
    v.use(index$3.IBizBIReportPanel);
    v.component(reportPanel.ReportPanelControl.name, reportPanel.ReportPanelControl);
    runtime.registerControlProvider(
      runtime.ControlType.REPORT_PANEL,
      () => new reportPanel_provider.ReportPanelProvider()
    );
  }
);

exports.IBizReportPanelControl = IBizReportPanelControl;
exports.default = IBizReportPanelControl;
