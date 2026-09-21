import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { GridContainer } from './grid-container';
import { GridContainerProvider } from './grid-container.provider';
import { GridContainerState } from './grid-container.state';
import { GridContainerController } from './grid-container.controller';

export { GridContainerState, GridContainerController };

export const IBizGridContainer = withInstall(GridContainer, function (v: App) {
  v.component(GridContainer.name!, GridContainer);
  registerPanelItemProvider(
    'CONTAINER_CONTAINER_GRID',
    () => new GridContainerProvider(),
  );
});

export default IBizGridContainer;
