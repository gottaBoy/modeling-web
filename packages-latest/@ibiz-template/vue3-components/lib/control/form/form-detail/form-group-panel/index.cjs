'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var formGroupPanel = require('./form-group-panel.cjs');
var formGroupPanel_provider = require('./form-group-panel.provider.cjs');

"use strict";
const IBizFormGroupPanel = vue3Util.withInstall(
  formGroupPanel.FormGroupPanel,
  function(v) {
    v.component(formGroupPanel.FormGroupPanel.name, formGroupPanel.FormGroupPanel);
    runtime.registerFormDetailProvider(
      "GROUPPANEL",
      () => new formGroupPanel_provider.FormGroupPanelProvider()
    );
  }
);

exports.IBizFormGroupPanel = IBizFormGroupPanel;
exports.default = IBizFormGroupPanel;
