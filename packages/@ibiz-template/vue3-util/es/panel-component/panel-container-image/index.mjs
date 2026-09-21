import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelContainerImage } from './panel-container-image.mjs';
import { PanelContainerImageProvider } from './panel-container-image.provider.mjs';
export { PanelContainerImageState } from './panel-container-image.state.mjs';
export { PanelContainerImageController } from './panel-container-image.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelContainerImage = withInstall(
  PanelContainerImage,
  function(v) {
    v.component(PanelContainerImage.name, PanelContainerImage);
    registerPanelItemProvider(
      "CONTAINER_CONTAINER_IMAGE",
      () => new PanelContainerImageProvider()
    );
  }
);

export { IBizPanelContainerImage, IBizPanelContainerImage as default };
