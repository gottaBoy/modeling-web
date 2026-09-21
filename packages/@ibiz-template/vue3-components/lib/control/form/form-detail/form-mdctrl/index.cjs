'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formMdctrl = require('./form-mdctrl.cjs');
var formMdctrlForm = require('./form-mdctrl-form/form-mdctrl-form.cjs');
var formMdctrlMd = require('./form-mdctrl-md/form-mdctrl-md.cjs');
var formMdctrlRepeater = require('./form-mdctrl-repeater/form-mdctrl-repeater.cjs');
var formMdctrl_provider = require('./form-mdctrl.provider.cjs');
var mdctrlContainer = require('./mdctrl-container/mdctrl-container.cjs');
var mdctrlContainer2 = require('./mdctrl-container2/mdctrl-container2.cjs');

"use strict";
const IBizFormMDCtrl = vue3Util.withInstall(formMdctrl.FormMDCtrl, function(v) {
  v.component(formMdctrl.FormMDCtrl.name, formMdctrl.FormMDCtrl);
  v.component(formMdctrlForm.FormMDCtrlForm.name, formMdctrlForm.FormMDCtrlForm);
  v.component(formMdctrlMd.FormMDCtrlMD.name, formMdctrlMd.FormMDCtrlMD);
  v.component(formMdctrlRepeater.FormMDCtrlRepeater.name, formMdctrlRepeater.FormMDCtrlRepeater);
  v.component(mdctrlContainer.MDCtrlContainer.name, mdctrlContainer.MDCtrlContainer);
  v.component(mdctrlContainer2.MDCtrlContainer2.name, mdctrlContainer2.MDCtrlContainer2);
  runtime.registerFormDetailProvider("MDCTRL", () => new formMdctrl_provider.FormMDCtrlProvider());
});

exports.IBizFormMDCtrl = IBizFormMDCtrl;
exports.default = IBizFormMDCtrl;
