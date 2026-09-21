import { registerPanelItemProvider } from '@ibiz-template/runtime';
export { PanelContainerGroupState } from './panel-container-group.state.mjs';
import { PanelContainerGroupProvider } from './panel-container-group.provider.mjs';
export { PanelContainerGroupController } from './panel-container-group.controller.mjs';
import { PanelContainerGroup } from './panel-container-group.mjs';
import '../../util/index.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelContainerGroup = withInstall(
  PanelContainerGroup,
  function(v) {
    v.component(PanelContainerGroup.name, PanelContainerGroup);
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_GROUP",
      () => new PanelContainerGroupProvider()
    );
  }
);

export { IBizPanelContainerGroup, IBizPanelContainerGroup as default };
