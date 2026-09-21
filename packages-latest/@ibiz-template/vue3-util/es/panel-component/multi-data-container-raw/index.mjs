import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { MultiDataContainerRaw } from './multi-data-container-raw.mjs';
import { MultiDataContainerRawProvider } from './multi-data-container-raw.provider.mjs';
export { MultiDataContainerRawState } from './multi-data-container-raw.state.mjs';
export { MultiDataContainerRawController } from './multi-data-container-raw.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizMultiDataContainerRaw = withInstall(
  MultiDataContainerRaw,
  function(v) {
    v.component(MultiDataContainerRaw.name, MultiDataContainerRaw);
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_MULTIDATA_RAW",
      () => new MultiDataContainerRawProvider()
    );
  }
);

export { IBizMultiDataContainerRaw, IBizMultiDataContainerRaw as default };
