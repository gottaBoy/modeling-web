import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ToolbarControl } from './toolbar.mjs';
import { ToolbarProvider } from './toolbar.provider.mjs';

"use strict";
const IBizToolbarControl = withInstall(
  ToolbarControl,
  function(v) {
    v.component(ToolbarControl.name, ToolbarControl);
    registerControlProvider(ControlType.TOOLBAR, () => new ToolbarProvider());
  }
);

export { IBizToolbarControl, IBizToolbarControl as default };
