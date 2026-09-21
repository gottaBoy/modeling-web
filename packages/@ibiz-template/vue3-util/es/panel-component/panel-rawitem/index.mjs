import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelRawItem } from './panel-rawitem.mjs';
import { PanelRawItemProvider } from './panel-rawitem.provider.mjs';
export { PanelRawItemController } from './panel-rawitem.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelRawItem = withInstall(PanelRawItem, function(v) {
  v.component(PanelRawItem.name, PanelRawItem);
  registerPanelItemProvider("RAWITEM", () => new PanelRawItemProvider());
  registerPanelItemProvider(
    "RAWITEM_STATIC_IMAGE",
    () => new PanelRawItemProvider()
  );
  registerPanelItemProvider(
    "RAWITEM_STATIC_LABEL",
    () => new PanelRawItemProvider()
  );
  registerPanelItemProvider(
    "RAWITEM_STATIC_TEXT",
    () => new PanelRawItemProvider()
  );
});

export { IBizPanelRawItem, IBizPanelRawItem as default };
