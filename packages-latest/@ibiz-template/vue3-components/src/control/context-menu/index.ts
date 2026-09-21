import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { ContextMenuControl } from './context-menu';
import { ContextMenuProvider } from './context-menu.provider';

export const IBizContextMenuControl = withInstall(
  ContextMenuControl,
  function (v: App) {
    v.component(ContextMenuControl.name, ContextMenuControl);
    registerControlProvider(
      ControlType.CONTEXT_MENU,
      () => new ContextMenuProvider(),
    );
  },
);

export default IBizContextMenuControl;
