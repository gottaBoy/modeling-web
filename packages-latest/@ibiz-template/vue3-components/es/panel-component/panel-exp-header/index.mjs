import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelExpHeader } from './panel-exp-header.mjs';
import { PanelExpHeaderProvider } from './panel-exp-header.provider.mjs';

"use strict";
const IBizPanelExpHeader = withInstall(
  PanelExpHeader,
  function(v) {
    v.component(PanelExpHeader.name, PanelExpHeader);
    registerPanelItemProvider(
      "CONTAINER_Exp_Header",
      () => new PanelExpHeaderProvider()
    );
  }
);

export { IBizPanelExpHeader, IBizPanelExpHeader as default };
