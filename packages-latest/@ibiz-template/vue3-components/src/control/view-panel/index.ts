import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ViewPanelControl } from './view-panel';
import { ViewPanelProvider } from './view-panel.provider';

export const IBizViewPanelControl = withInstall(
  ViewPanelControl,
  function (v: App) {
    v.component(ViewPanelControl.name, ViewPanelControl);
    registerControlProvider(
      ControlType.VIEWPANEL,
      () => new ViewPanelProvider(),
    );
  },
);

export default IBizViewPanelControl;
