import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ListExpBarControl } from './list-exp-bar.mjs';
import { ListExpBarProvider } from './list-exp-bar.provider.mjs';

"use strict";
const IBizListExpBarControl = withInstall(
  ListExpBarControl,
  function(v) {
    v.component(ListExpBarControl.name, ListExpBarControl);
    registerControlProvider(
      ControlType.LIST_EXPBAR,
      () => new ListExpBarProvider()
    );
  }
);

export { IBizListExpBarControl, IBizListExpBarControl as default };
