import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { ViewMessage } from './view-message.mjs';
import { ViewMessageProvider } from './view-message.provider.mjs';

"use strict";
const IBizViewMessage = withInstall(ViewMessage, function(v) {
  v.component(ViewMessage.name, ViewMessage);
  registerPanelItemProvider(
    "RAWITEM_VIEW_MESSAGE",
    () => new ViewMessageProvider()
  );
});

export { IBizViewMessage, IBizViewMessage as default };
