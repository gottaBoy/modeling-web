import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { ScrollContainerItem } from './scroll-container-item/scroll-container-item.mjs';
import { ScrollContainerItemProvider } from './scroll-container-item/scroll-container-item.provider.mjs';
import { ScrollContainer } from './scroll-container/scroll-container.mjs';
import { ScrollContainerProvider } from './scroll-container/scroll-container.provider.mjs';
import './scroll-container/index.mjs';
import './scroll-container-item/index.mjs';
import { withInstall } from '../../util/install.mjs';
export { ScrollContainerController } from './scroll-container/scroll-container.controller.mjs';
export { ScrollContainerItemController } from './scroll-container-item/scroll-container-item.controller.mjs';

"use strict";
const IBizScrollContainer = withInstall(
  ScrollContainer,
  function(v) {
    v.component(ScrollContainer.name, ScrollContainer);
    v.component(ScrollContainerItem.name, ScrollContainerItem);
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL",
      () => new ScrollContainerProvider()
    );
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_LEFT",
      () => new ScrollContainerItemProvider()
    );
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_HEADER",
      () => new ScrollContainerItemProvider()
    );
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_RIGHT",
      () => new ScrollContainerItemProvider()
    );
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_BOTTOM",
      () => new ScrollContainerItemProvider()
    );
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_SCROLL_MAIN",
      () => new ScrollContainerItemProvider()
    );
  }
);

export { IBizScrollContainer, ScrollContainer, ScrollContainerItem, IBizScrollContainer as default };
