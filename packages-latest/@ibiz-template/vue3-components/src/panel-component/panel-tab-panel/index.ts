import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { PanelTabPanel } from './panel-tab-panel';
import { PanelTabPanelProvider } from './panel-tab-panel.provider';

export const IBizPanelTabPanel = withInstall(PanelTabPanel, function (v: App) {
  v.component(PanelTabPanel.name, PanelTabPanel);
  registerPanelItemProvider('TABPANEL', () => new PanelTabPanelProvider());
});

export default IBizPanelTabPanel;
