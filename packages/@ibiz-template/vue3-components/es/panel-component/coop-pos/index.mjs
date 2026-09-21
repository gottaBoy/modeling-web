import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { CoopPos } from './coop-pos.mjs';
import { CoopPosProvider } from './coop-pos.provider.mjs';
export { CoopPosState } from './coop-pos.state.mjs';
export { CoopPosController } from './coop-pos.controller.mjs';

"use strict";
const IBizCoopPos = withInstall(CoopPos, function(v) {
  v.component(CoopPos.name, CoopPos);
  registerPanelItemProvider("RAWITEM_COOP_POS", () => new CoopPosProvider());
});

export { IBizCoopPos, IBizCoopPos as default };
