import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { WizardPanelControl } from './wizard-panel';
import { WizardPanelProvider } from './wizard-panel.provider';

export const IBizWizardPanelControl = withInstall(
  WizardPanelControl,
  function (v: App) {
    v.component(WizardPanelControl.name, WizardPanelControl);
    registerControlProvider(
      ControlType.WIZARD_PANEL,
      () => new WizardPanelProvider(),
    );
  },
);

export default IBizWizardPanelControl;
