import { withInstall } from '@ibiz-template/vue3-util';
import { UserReportPanel } from './user-report-panel.mjs';

"use strict";
const IBizUserReportPanel = withInstall(
  UserReportPanel,
  function(v) {
    v.component(UserReportPanel.name, UserReportPanel);
  }
);

export { IBizUserReportPanel, IBizUserReportPanel as default };
