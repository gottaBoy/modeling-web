import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { SingleDataContainer } from './single-data-container';
import { SingleDataContainerProvider } from './single-data-container.provider';
import { SingleDataContainerState } from './single-data-container.state';
import { SingleDataContainerController } from './single-data-container.controller';

export { SingleDataContainerState, SingleDataContainerController };

export const IBizSingleDataContainer = withInstall(
  SingleDataContainer,
  function (v: App) {
    v.component(SingleDataContainer.name!, SingleDataContainer);
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_SINGLEDATA',
      () => new SingleDataContainerProvider(),
    );
  },
);

export default IBizSingleDataContainer;
