import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ContextMenuControl } from './context-menu.mjs';
import { ContextMenuProvider } from './context-menu.provider.mjs';

"use strict";
const IBizContextMenuControl = withInstall(
  ContextMenuControl,
  function(v) {
    v.component(ContextMenuControl.name, ContextMenuControl);
    registerControlProvider(
      ControlType.CONTEXT_MENU,
      () => new ContextMenuProvider()
    );
  }
);

export { IBizContextMenuControl, IBizContextMenuControl as default };
