import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { GridContainer } from './grid-container.mjs';
import { GridContainerProvider } from './grid-container.provider.mjs';
export { GridContainerState } from './grid-container.state.mjs';
export { GridContainerController } from './grid-container.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizGridContainer = withInstall(GridContainer, function(v) {
  v.component(GridContainer.name, GridContainer);
  registerPanelItemProvider(
    "CONTAINER_CONTAINER_GRID",
    () => new GridContainerProvider()
  );
});

export { IBizGridContainer, IBizGridContainer as default };
