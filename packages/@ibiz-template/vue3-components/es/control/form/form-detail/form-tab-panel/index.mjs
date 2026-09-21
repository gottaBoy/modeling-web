import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormTabPanel } from './form-tab-panel.mjs';
import { FormTabPanelProvider } from './form-tab-panel.provider.mjs';

"use strict";
const IBizFormTabPanel = withInstall(FormTabPanel, function(v) {
  v.component(FormTabPanel.name, FormTabPanel);
  registerFormDetailProvider("TABPANEL", () => new FormTabPanelProvider());
});

export { IBizFormTabPanel, IBizFormTabPanel as default };
