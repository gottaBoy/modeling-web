import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { WizardPanelControl } from './wizard-panel.mjs';
import { WizardPanelProvider } from './wizard-panel.provider.mjs';

"use strict";
const IBizWizardPanelControl = withInstall(
  WizardPanelControl,
  function(v) {
    v.component(WizardPanelControl.name, WizardPanelControl);
    registerControlProvider(
      ControlType.WIZARD_PANEL,
      () => new WizardPanelProvider()
    );
  }
);

export { IBizWizardPanelControl, IBizWizardPanelControl as default };
