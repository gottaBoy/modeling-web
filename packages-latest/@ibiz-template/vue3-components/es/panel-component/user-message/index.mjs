import { registerAsyncActionProvider, registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import './async-action/index.mjs';
import { UserMessage } from './user-message.mjs';
import { UserMessageProvider } from './user-message.provider.mjs';
import { installInternalMessage } from './internal-message/index.mjs';
import { AsyncAction } from './async-action/async-action/async-action.mjs';
import { AsyncActionProvider } from './async-action/async-action/async-action.provider.mjs';

"use strict";
const IBizUserMessage = withInstall(
  UserMessage,
  function(v) {
    v.component(UserMessage.name, UserMessage);
    v.component(AsyncAction.name, AsyncAction);
    registerAsyncActionProvider(
      "DEIMPORTDATA2",
      () => new AsyncActionProvider()
    );
    registerAsyncActionProvider(
      "DEEXPORTDATA",
      () => new AsyncActionProvider()
    );
    registerAsyncActionProvider("DEFAULT", () => new AsyncActionProvider());
    installInternalMessage(v);
    registerPanelItemProvider(
      "RAWITEM_USERMESSAGE",
      () => new UserMessageProvider()
    );
  }
);

export { IBizUserMessage, IBizUserMessage as default };
