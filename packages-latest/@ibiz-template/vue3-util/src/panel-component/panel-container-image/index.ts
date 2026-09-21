import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { PanelContainerImage } from './panel-container-image';
import { PanelContainerImageProvider } from './panel-container-image.provider';
import { PanelContainerImageState } from './panel-container-image.state';
import { PanelContainerImageController } from './panel-container-image.controller';

export { PanelContainerImageState, PanelContainerImageController };

export const IBizPanelContainerImage = withInstall(
  PanelContainerImage,
  function (v: App) {
    v.component(PanelContainerImage.name!, PanelContainerImage);
    registerPanelItemProvider(
      'CONTAINER_CONTAINER_IMAGE',
      () => new PanelContainerImageProvider(),
    );
  },
);

export default IBizPanelContainerImage;
