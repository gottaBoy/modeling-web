import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ListControl } from './list.mjs';
import { ListProvider } from './list.provider.mjs';

"use strict";
const IBizListControl = withInstall(ListControl, function(v) {
  v.component(ListControl.name, ListControl);
  registerControlProvider(ControlType.LIST, () => new ListProvider());
});

export { IBizListControl, IBizListControl as default };
