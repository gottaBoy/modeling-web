import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { UserAction } from './user-action';
import { UserActionProvider } from './user-action-provider';

export const IBizUserAction = withInstall(UserAction, function (v: App) {
  v.component(UserAction.name, UserAction);
  registerPanelItemProvider('RAWITEM_SETTING', () => new UserActionProvider());
  registerPanelItemProvider('RAWITEM_HELPER', () => new UserActionProvider());
  registerPanelItemProvider('RAWITEM_CUSTOM', () => new UserActionProvider());
});

export default IBizUserAction;
