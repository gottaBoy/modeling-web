import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { NavPosIndex } from './nav-pos-index.mjs';
import { NavPosIndexProvider } from './nav-pos-index.provider.mjs';
export { NavPosIndexState } from './nav-pos-index.state.mjs';
export { NavPosIndexController } from './nav-pos-index.controller.mjs';

"use strict";
const IBizNavPosIndex = withInstall(NavPosIndex, function(v) {
  v.component(NavPosIndex.name, NavPosIndex);
  registerPanelItemProvider(
    "RAWITEM_NAV_POS_INDEX",
    () => new NavPosIndexProvider()
  );
});

export { IBizNavPosIndex, IBizNavPosIndex as default };
