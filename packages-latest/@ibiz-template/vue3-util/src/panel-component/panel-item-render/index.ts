import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '../../util';
import { PanelItemRender } from './panel-item-render';
import { PanelItemRenderProvider } from './panel-item-render.provider';

export const IBizPanelItemRender = withInstall(
  PanelItemRender,
  function (v: App) {
    v.component(PanelItemRender.name!, PanelItemRender);
    registerPanelItemProvider(
      'PREDEFINE_RENDER',
      () => new PanelItemRenderProvider(),
    );
  },
);

export default IBizPanelItemRender;
