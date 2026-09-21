'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var editForm_provider = require('./edit-form.provider.cjs');
var editForm = require('./edit-form.cjs');

"use strict";
const IBizEditFormControl = vue3Util.withInstall(
  editForm.EditFormControl,
  function(v) {
    v.component(editForm.EditFormControl.name, editForm.EditFormControl);
    runtime.registerControlProvider(runtime.ControlType.FORM, () => new editForm_provider.EditFormProvider());
  }
);

exports.IBizEditFormControl = IBizEditFormControl;
exports.default = IBizEditFormControl;
