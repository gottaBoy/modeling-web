import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { MultiDataContainerRaw } from './multi-data-container-raw';
import { MultiDataContainerRawProvider } from './multi-data-container-raw.provider';
import { MultiDataContainerRawState } from './multi-data-container-raw.state';
import { MultiDataContainerRawController } from './multi-data-container-raw.controller';

export { MultiDataContainerRawState, MultiDataContainerRawController };

export const IBizMultiDataContainerRaw = withInstall(
  MultiDataContainerRaw,
  function (v: App) {
    v.component(MultiDataContainerRaw.name!, MultiDataContainerRaw);
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_MULTIDATA_RAW',
      () => new MultiDataContainerRawProvider(),
    );
  },
);

export default IBizMultiDataContainerRaw;
