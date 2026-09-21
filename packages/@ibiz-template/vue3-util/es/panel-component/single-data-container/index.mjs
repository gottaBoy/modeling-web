import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { SingleDataContainer } from './single-data-container.mjs';
import { SingleDataContainerProvider } from './single-data-container.provider.mjs';
export { SingleDataContainerState } from './single-data-container.state.mjs';
export { SingleDataContainerController } from './single-data-container.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizSingleDataContainer = withInstall(
  SingleDataContainer,
  function(v) {
    v.component(SingleDataContainer.name, SingleDataContainer);
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_SINGLEDATA",
      () => new SingleDataContainerProvider()
    );
  }
);

export { IBizSingleDataContainer, IBizSingleDataContainer as default };
