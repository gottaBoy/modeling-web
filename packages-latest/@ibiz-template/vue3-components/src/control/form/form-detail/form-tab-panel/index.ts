import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormTabPanel from './form-tab-panel';
import { FormTabPanelProvider } from './form-tab-panel.provider';

export const IBizFormTabPanel = withInstall(FormTabPanel, function (v: App) {
  v.component(FormTabPanel.name, FormTabPanel);
  // 表单关系界面
  registerFormDetailProvider('TABPANEL', () => new FormTabPanelProvider());
});

export default IBizFormTabPanel;
