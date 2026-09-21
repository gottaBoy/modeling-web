'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var userReportPanel = require('./user-report-panel.cjs');

"use strict";
const IBizUserReportPanel = vue3Util.withInstall(
  userReportPanel.UserReportPanel,
  function(v) {
    v.component(userReportPanel.UserReportPanel.name, userReportPanel.UserReportPanel);
  }
);

exports.IBizUserReportPanel = IBizUserReportPanel;
exports.default = IBizUserReportPanel;
