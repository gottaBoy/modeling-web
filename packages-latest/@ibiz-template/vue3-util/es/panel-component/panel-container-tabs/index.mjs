import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelContainerTabs } from './panel-container-tabs.mjs';
import { PanelContainerTabsProvider } from './panel-container-tabs.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelContainerTabs = withInstall(
  PanelContainerTabs,
  function(v) {
    v.component(PanelContainerTabs.name, PanelContainerTabs);
    registerPanelItemProvider(
      "CONTAINER_TABS",
      () => new PanelContainerTabsProvider()
    );
  }
);

export { IBizPanelContainerTabs, IBizPanelContainerTabs as default };
