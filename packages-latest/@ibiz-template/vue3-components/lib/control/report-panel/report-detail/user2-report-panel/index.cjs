'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var user2ReportPanel = require('./user2-report-panel.cjs');

"use strict";
const IBizUser2ReportPanel = vue3Util.withInstall(
  user2ReportPanel.User2ReportPanel,
  function(v) {
    v.component(user2ReportPanel.User2ReportPanel.name, user2ReportPanel.User2ReportPanel);
  }
);

exports.IBizUser2ReportPanel = IBizUser2ReportPanel;
exports.default = IBizUser2ReportPanel;
