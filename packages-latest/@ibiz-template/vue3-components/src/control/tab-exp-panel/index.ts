import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { TabExpPanelControl } from './tab-exp-panel';
import { TabExpPanelProvider } from './tab-exp-panel.provider';

export const IBizTabExpPanelControl = withInstall(
  TabExpPanelControl,
  function (v: App) {
    v.component(TabExpPanelControl.name, TabExpPanelControl);
    registerControlProvider(
      ControlType.TAB_EXP_PANEL,
      () => new TabExpPanelProvider(),
    );
  },
);

export default IBizTabExpPanelControl;
