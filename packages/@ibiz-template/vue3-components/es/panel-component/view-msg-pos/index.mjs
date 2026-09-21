import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { ViewMsgPos } from './view-msg-pos.mjs';
import { ViewMsgPosProvider } from './view-msg-pos.provider.mjs';
export { ViewMsgPosController } from './view-msg-pos.controller.mjs';

"use strict";
const IBizViewMsgPos = withInstall(ViewMsgPos, function(v) {
  v.component(ViewMsgPos.name, ViewMsgPos);
  registerPanelItemProvider(
    "RAWITEM_VIEWMSG_POS",
    () => new ViewMsgPosProvider()
  );
});

export { IBizViewMsgPos, IBizViewMsgPos as default };
