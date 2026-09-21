import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { MultiDataContainer } from './multi-data-container.mjs';
import { MultiDataContainerProvider } from './multi-data-container.provider.mjs';
export { MultiDataContainerState } from './multi-data-container.state.mjs';
export { MultiDataContainerController } from './multi-data-container.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizMultiDataContainer = withInstall(
  MultiDataContainer,
  function(v) {
    v.component(MultiDataContainer.name, MultiDataContainer);
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_MULTIDATA",
      () => new MultiDataContainerProvider()
    );
  }
);

export { IBizMultiDataContainer, IBizMultiDataContainer as default };
