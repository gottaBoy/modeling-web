import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { IndexActions } from './index-actions.mjs';
import { IndexActionsProvider } from './index-actions.provider.mjs';

"use strict";
const IBizIndexActions = withInstall(IndexActions, function(v) {
  v.component(IndexActions.name, IndexActions);
  registerPanelItemProvider(
    "CONTAINER_INDEX_ACTIONS",
    () => new IndexActionsProvider()
  );
});

export { IBizIndexActions, IBizIndexActions as default };
