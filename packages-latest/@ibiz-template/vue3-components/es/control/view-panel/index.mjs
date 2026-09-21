import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ViewPanelControl } from './view-panel.mjs';
import { ViewPanelProvider } from './view-panel.provider.mjs';

"use strict";
const IBizViewPanelControl = withInstall(
  ViewPanelControl,
  function(v) {
    v.component(ViewPanelControl.name, ViewPanelControl);
    registerControlProvider(
      ControlType.VIEWPANEL,
      () => new ViewPanelProvider()
    );
  }
);

export { IBizViewPanelControl, IBizViewPanelControl as default };
