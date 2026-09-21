import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { PickupViewPanelControl } from './pickup-view-panel';
import { PickupViewPanelProvider } from './pickup-view-panel.provider';

export const IBizPickupViewPanelControl = withInstall(
  PickupViewPanelControl,
  function (v: App) {
    v.component(PickupViewPanelControl.name, PickupViewPanelControl);
    registerControlProvider(
      ControlType.PICKUP_VIEW_PANEL,
      () => new PickupViewPanelProvider(),
    );
  },
);

export default IBizPickupViewPanelControl;
