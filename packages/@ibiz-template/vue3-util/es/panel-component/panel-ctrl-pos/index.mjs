import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelCtrlPos } from './panel-ctrl-pos.mjs';
import { PanelCtrlPosProvider } from './panel-ctrl-pos.provider.mjs';
export { PanelCtrlPosController } from './panel-ctrl-pos.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelCtrlPos = withInstall(PanelCtrlPos, function(v) {
  v.component(PanelCtrlPos.name, PanelCtrlPos);
  registerPanelItemProvider("CTRLPOS", () => new PanelCtrlPosProvider());
});

export { IBizPanelCtrlPos, IBizPanelCtrlPos as default };
