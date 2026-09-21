import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { User2ReportPanel } from './user2-report-panel';

export const IBizUser2ReportPanel = withInstall(
  User2ReportPanel,
  function (v: App) {
    v.component(User2ReportPanel.name, User2ReportPanel);
  },
);

export default IBizUser2ReportPanel;
