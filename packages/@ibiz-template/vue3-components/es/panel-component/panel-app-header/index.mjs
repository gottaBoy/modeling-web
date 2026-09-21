import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelAppHeader } from './panel-app-header.mjs';
import { PanelAppHeaderProvider } from './panel-app-header.provider.mjs';

"use strict";
const IBizPanelAppHeader = withInstall(
  PanelAppHeader,
  function(v) {
    v.component(PanelAppHeader.name, PanelAppHeader);
    registerPanelItemProvider(
      "CONTAINER_AppHeader",
      () => new PanelAppHeaderProvider()
    );
  }
);

export { IBizPanelAppHeader, IBizPanelAppHeader as default };
