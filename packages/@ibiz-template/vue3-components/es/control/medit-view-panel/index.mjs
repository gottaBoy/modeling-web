import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { MEditViewPanelControl } from './medit-view-panel.mjs';
import { MEditViewPanelProvider } from './medit-view-panel.provider.mjs';

"use strict";
const IBizMEditViewPanelControl = withInstall(
  MEditViewPanelControl,
  function(v) {
    v.component(MEditViewPanelControl.name, MEditViewPanelControl);
    registerControlProvider(
      ControlType.MULTI_EDIT_VIEWPANEL,
      () => new MEditViewPanelProvider()
    );
  }
);

export { IBizMEditViewPanelControl, IBizMEditViewPanelControl as default };
