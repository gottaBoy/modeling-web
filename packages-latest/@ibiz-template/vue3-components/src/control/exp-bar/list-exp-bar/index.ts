import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ListExpBarControl } from './list-exp-bar';
import { ListExpBarProvider } from './list-exp-bar.provider';

export const IBizListExpBarControl = withInstall(
  ListExpBarControl,
  function (v: App) {
    v.component(ListExpBarControl.name, ListExpBarControl);
    registerControlProvider(
      ControlType.LIST_EXPBAR,
      () => new ListExpBarProvider(),
    );
  },
);

export default IBizListExpBarControl;
