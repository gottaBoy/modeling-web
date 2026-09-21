import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { IndexActions } from './index-actions';
import { IndexActionsProvider } from './index-actions.provider';

export const IBizIndexActions = withInstall(IndexActions, function (v: App) {
  v.component(IndexActions.name, IndexActions);
  registerPanelItemProvider(
    'CONTAINER_INDEX_ACTIONS',
    () => new IndexActionsProvider(),
  );
});

export default IBizIndexActions;
