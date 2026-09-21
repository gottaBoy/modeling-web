import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { MEditViewPanelControl } from './medit-view-panel';
import { MEditViewPanelProvider } from './medit-view-panel.provider';

export const IBizMEditViewPanelControl = withInstall(
  MEditViewPanelControl,
  function (v: App) {
    v.component(MEditViewPanelControl.name, MEditViewPanelControl);
    registerControlProvider(
      ControlType.MULTI_EDIT_VIEWPANEL,
      () => new MEditViewPanelProvider(),
    );
  },
);

export default IBizMEditViewPanelControl;
