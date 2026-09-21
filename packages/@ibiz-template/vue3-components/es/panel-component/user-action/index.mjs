import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { UserAction } from './user-action.mjs';
import { UserActionProvider } from './user-action-provider.mjs';

"use strict";
const IBizUserAction = withInstall(UserAction, function(v) {
  v.component(UserAction.name, UserAction);
  registerPanelItemProvider("RAWITEM_SETTING", () => new UserActionProvider());
  registerPanelItemProvider("RAWITEM_HELPER", () => new UserActionProvider());
  registerPanelItemProvider("RAWITEM_CUSTOM", () => new UserActionProvider());
});

export { IBizUserAction, IBizUserAction as default };
