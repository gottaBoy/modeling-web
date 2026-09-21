import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { PanelTabPanel } from './panel-tab-panel.mjs';
import { PanelTabPanelProvider } from './panel-tab-panel.provider.mjs';

"use strict";
const IBizPanelTabPanel = withInstall(PanelTabPanel, function(v) {
  v.component(PanelTabPanel.name, PanelTabPanel);
  registerPanelItemProvider("TABPANEL", () => new PanelTabPanelProvider());
});

export { IBizPanelTabPanel, IBizPanelTabPanel as default };
