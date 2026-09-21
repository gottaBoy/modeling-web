import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { PanelAppTitle } from './panel-app-title.mjs';
import { PanelAppTitleProvider } from './panel-app-title.provider.mjs';
export { PanelAppTitleController } from './panel-app-title.controller.mjs';

"use strict";
const IBizPanelAppTitle = withInstall(PanelAppTitle, function(v) {
  v.component(PanelAppTitle.name, PanelAppTitle);
  registerPanelItemProvider(
    "RAWITEM_APP_APPTITLE",
    () => new PanelAppTitleProvider()
  );
  registerPanelItemProvider(
    "CTRLPOS_APP_APPTITLE",
    () => new PanelAppTitleProvider()
  );
});

export { IBizPanelAppTitle, IBizPanelAppTitle as default };
