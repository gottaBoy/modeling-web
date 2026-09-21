import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { PanelButton } from './panel-button.mjs';
import { PanelButtonProvider } from './panel-button.provider.mjs';
export { PanelButtonController } from './panel-button.controller.mjs';

"use strict";
const IBizPanelButton = withInstall(PanelButton, function(v) {
  v.component(PanelButton.name, PanelButton);
  registerPanelItemProvider("BUTTON", () => new PanelButtonProvider());
});

export { IBizPanelButton, IBizPanelButton as default };
