import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { UserReportPanel } from './user-report-panel';

export const IBizUserReportPanel = withInstall(
  UserReportPanel,
  function (v: App) {
    v.component(UserReportPanel.name!, UserReportPanel);
  },
);

export default IBizUserReportPanel;
