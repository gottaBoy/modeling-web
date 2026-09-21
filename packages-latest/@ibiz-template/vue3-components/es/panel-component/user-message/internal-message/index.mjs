import { registerInternalMessageProvider } from '@ibiz-template/runtime';
import { InternalMessageDefaultProvider } from './common/internal-message-default/internal-message-default.provider.mjs';
import { InternalMessageDefault } from './common/internal-message-default/internal-message-default.mjs';
import { InternalMessageJSONtProvider } from './internal-message-json/internal-message-json.provider.mjs';
import { InternalMessageJSON } from './internal-message-json/internal-message-json.mjs';
import { InternalMessageContainer } from './common/internal-message-container/internal-message-container.mjs';
import { InternalMessageHTML } from './internal-message-html/internal-message-html.mjs';
import { InternalMessageHTMLtProvider } from './internal-message-html/internal-message-html.provider.mjs';
import { InternalMessageTextProvider } from './internal-message-text/internal-message-text.provider.mjs';
import { InternalMessageText } from './internal-message-text/internal-message-text.mjs';
import { InternalMessagGroup } from './internal-message-group/internal-message-group.mjs';
export { InternalMessageTab } from './internal-message-tab/internal-message-tab.mjs';

"use strict";
function installInternalMessage(v) {
  v.component(InternalMessagGroup.name, InternalMessagGroup);
  v.component(InternalMessageContainer.name, InternalMessageContainer);
  v.component(InternalMessageDefault.name, InternalMessageDefault);
  v.component(InternalMessageJSON.name, InternalMessageJSON);
  v.component(InternalMessageHTML.name, InternalMessageHTML);
  v.component(InternalMessageText.name, InternalMessageText);
  registerInternalMessageProvider(
    "DEFAULT",
    () => new InternalMessageDefaultProvider()
  );
  registerInternalMessageProvider(
    "JSON",
    () => new InternalMessageJSONtProvider()
  );
  registerInternalMessageProvider(
    "HTML",
    () => new InternalMessageHTMLtProvider()
  );
  registerInternalMessageProvider(
    "TEXT",
    () => new InternalMessageTextProvider()
  );
}

export { installInternalMessage };
