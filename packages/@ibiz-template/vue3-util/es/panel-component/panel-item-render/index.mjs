import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelItemRender } from './panel-item-render.mjs';
import { PanelItemRenderProvider } from './panel-item-render.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelItemRender = withInstall(
  PanelItemRender,
  function(v) {
    v.component(PanelItemRender.name, PanelItemRender);
    registerPanelItemProvider(
      "PREDEFINE_RENDER",
      () => new PanelItemRenderProvider()
    );
  }
);

export { IBizPanelItemRender, IBizPanelItemRender as default };
