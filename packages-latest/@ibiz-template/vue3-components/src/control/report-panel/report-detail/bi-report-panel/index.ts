import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { BIReportPanel } from './bi-report-panel';

export const IBizBIReportPanel = withInstall(BIReportPanel, function (v: App) {
  v.component(BIReportPanel.name!, BIReportPanel);
});

export default IBizBIReportPanel;
