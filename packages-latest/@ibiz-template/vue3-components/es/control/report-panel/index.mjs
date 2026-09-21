import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ReportPanelControl } from './report-panel.mjs';
import { ReportPanelProvider } from './report-panel.provider.mjs';
import './report-detail/index.mjs';
import { IBizBIReport } from './report-detail/bi-report/index.mjs';
import { IBizUserReportPanel } from './report-detail/user-report-panel/index.mjs';
import { IBizUser2ReportPanel } from './report-detail/user2-report-panel/index.mjs';
import { IBizBIReportPanel } from './report-detail/bi-report-panel/index.mjs';

"use strict";
const IBizReportPanelControl = withInstall(
  ReportPanelControl,
  function(v) {
    v.use(IBizBIReport);
    v.use(IBizUserReportPanel);
    v.use(IBizUser2ReportPanel);
    v.use(IBizBIReportPanel);
    v.component(ReportPanelControl.name, ReportPanelControl);
    registerControlProvider(
      ControlType.REPORT_PANEL,
      () => new ReportPanelProvider()
    );
  }
);

export { IBizReportPanelControl, IBizReportPanelControl as default };
