import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelCtrlViewPageCaption } from './panel-ctrl-view-page-caption.mjs';
import { PanelCtrlViewPageProvider } from './panel-ctrl-view-page-caption.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelCtrlViewPageCaption = withInstall(
  PanelCtrlViewPageCaption,
  function(v) {
    v.component(PanelCtrlViewPageCaption.name, PanelCtrlViewPageCaption);
    registerPanelItemProvider(
      "CTRLPOS_VIEW_PAGECAPTION",
      () => new PanelCtrlViewPageProvider()
    );
  }
);

export { IBizPanelCtrlViewPageCaption, IBizPanelCtrlViewPageCaption as default };
