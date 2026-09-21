import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { MultiDataContainer } from './multi-data-container';
import { MultiDataContainerProvider } from './multi-data-container.provider';
import { MultiDataContainerState } from './multi-data-container.state';
import { MultiDataContainerController } from './multi-data-container.controller';

export { MultiDataContainerState, MultiDataContainerController };

export const IBizMultiDataContainer = withInstall(
  MultiDataContainer,
  function (v: App) {
    v.component(MultiDataContainer.name!, MultiDataContainer);
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_MULTIDATA',
      () => new MultiDataContainerProvider(),
    );
  },
);

export default IBizMultiDataContainer;
