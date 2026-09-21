import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { TabExpPanelControl } from './tab-exp-panel.mjs';
import { TabExpPanelProvider } from './tab-exp-panel.provider.mjs';

"use strict";
const IBizTabExpPanelControl = withInstall(
  TabExpPanelControl,
  function(v) {
    v.component(TabExpPanelControl.name, TabExpPanelControl);
    registerControlProvider(
      ControlType.TAB_EXP_PANEL,
      () => new TabExpPanelProvider()
    );
  }
);

export { IBizTabExpPanelControl, IBizTabExpPanelControl as default };
