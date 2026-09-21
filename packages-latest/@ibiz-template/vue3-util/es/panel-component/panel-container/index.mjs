import { registerPanelItemProvider } from '@ibiz-template/runtime';
export { PanelContainerController, PanelContainerState } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelContainer } from './panel-container.mjs';
import { PanelContainerProvider } from './panel-container.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelContainer = withInstall(
  PanelContainer,
  function(v) {
    v.component(PanelContainer.name, PanelContainer);
    registerPanelItemProvider("CONTAINER", () => new PanelContainerProvider());
    registerPanelItemProvider(
      "CONTAINER_DEFAULT",
      () => new PanelContainerProvider()
    );
  }
);

export { IBizPanelContainer, IBizPanelContainer as default };
