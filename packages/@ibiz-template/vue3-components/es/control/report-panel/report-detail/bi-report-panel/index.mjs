import { withInstall } from '@ibiz-template/vue3-util';
import { BIReportPanel } from './bi-report-panel.mjs';

"use strict";
const IBizBIReportPanel = withInstall(BIReportPanel, function(v) {
  v.component(BIReportPanel.name, BIReportPanel);
});

export { IBizBIReportPanel, IBizBIReportPanel as default };
