import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { NavPos } from './nav-pos.mjs';
import { NavPosProvider } from './nav-pos.provider.mjs';
export { NavPosState } from './nav-pos.state.mjs';
export { NavPosController } from './nav-pos.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizNavPos = withInstall(NavPos, function(v) {
  v.component(NavPos.name, NavPos);
  registerPanelItemProvider("RAWITEM_NAV_POS", () => new NavPosProvider());
});

export { IBizNavPos, IBizNavPos as default };
