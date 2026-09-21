import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '../../util';
import { ScrollContainerItem } from './scroll-container-item/scroll-container-item';
import { ScrollContainerItemProvider } from './scroll-container-item/scroll-container-item.provider';
import { ScrollContainer } from './scroll-container/scroll-container';
import { ScrollContainerProvider } from './scroll-container/scroll-container.provider';

export * from './scroll-container';
export * from './scroll-container-item';

export const IBizScrollContainer = withInstall(
  ScrollContainer,
  function (v: App) {
    v.component(ScrollContainer.name!, ScrollContainer);
    v.component(ScrollContainerItem.name!, ScrollContainerItem);
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_SCROLL',
      () => new ScrollContainerProvider(),
    );
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_SCROLL_LEFT',
      () => new ScrollContainerItemProvider(),
    );
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_SCROLL_HEADER',
      () => new ScrollContainerItemProvider(),
    );
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_SCROLL_RIGHT',
      () => new ScrollContainerItemProvider(),
    );
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_SCROLL_BOTTOM',
      () => new ScrollContainerItemProvider(),
    );
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_SCROLL_MAIN',
      () => new ScrollContainerItemProvider(),
    );
  },
);

export default IBizScrollContainer;
