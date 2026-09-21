import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { SplitContainer } from './split-container.mjs';
import { SplitContainerProvider } from './split-container.provider.mjs';
export { SplitContainerController } from './split-container.controller.mjs';

"use strict";
const IBizSplitContainer = withInstall(
  SplitContainer,
  function(v) {
    v.component(SplitContainer.name, SplitContainer);
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_H_SPLIT",
      () => new SplitContainerProvider()
    );
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_V_SPLIT",
      () => new SplitContainerProvider()
    );
  }
);

export { IBizSplitContainer, IBizSplitContainer as default };
