'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var wizardPanel = require('./wizard-panel.cjs');
var wizardPanel_provider = require('./wizard-panel.provider.cjs');

"use strict";
const IBizWizardPanelControl = vue3Util.withInstall(
  wizardPanel.WizardPanelControl,
  function(v) {
    v.component(wizardPanel.WizardPanelControl.name, wizardPanel.WizardPanelControl);
    runtime.registerControlProvider(
      runtime.ControlType.WIZARD_PANEL,
      () => new wizardPanel_provider.WizardPanelProvider()
    );
  }
);

exports.IBizWizardPanelControl = IBizWizardPanelControl;
exports.default = IBizWizardPanelControl;
