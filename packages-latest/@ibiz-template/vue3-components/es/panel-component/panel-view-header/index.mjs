import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelViewHeader } from './panel-view-header.mjs';
import { PanelViewHeaderProvider } from './panel-view-header.provider.mjs';

"use strict";
const IBizPanelViewHeader = withInstall(
  PanelViewHeader,
  function(v) {
    v.component(PanelViewHeader.name, PanelViewHeader);
    registerPanelItemProvider(
      "CONTAINER_ViewHeader",
      () => new PanelViewHeaderProvider()
    );
  }
);

export { IBizPanelViewHeader, IBizPanelViewHeader as default };
