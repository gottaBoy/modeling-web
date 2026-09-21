import { withInstall } from '@ibiz-template/vue3-util';
import { User2ReportPanel } from './user2-report-panel.mjs';

"use strict";
const IBizUser2ReportPanel = withInstall(
  User2ReportPanel,
  function(v) {
    v.component(User2ReportPanel.name, User2ReportPanel);
  }
);

export { IBizUser2ReportPanel, IBizUser2ReportPanel as default };
