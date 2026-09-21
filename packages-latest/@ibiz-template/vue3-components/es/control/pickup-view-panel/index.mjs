import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { PickupViewPanelControl } from './pickup-view-panel.mjs';
import { PickupViewPanelProvider } from './pickup-view-panel.provider.mjs';

"use strict";
const IBizPickupViewPanelControl = withInstall(
  PickupViewPanelControl,
  function(v) {
    v.component(PickupViewPanelControl.name, PickupViewPanelControl);
    registerControlProvider(
      ControlType.PICKUP_VIEW_PANEL,
      () => new PickupViewPanelProvider()
    );
  }
);

export { IBizPickupViewPanelControl, IBizPickupViewPanelControl as default };
