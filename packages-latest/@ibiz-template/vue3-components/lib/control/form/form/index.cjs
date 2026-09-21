'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var form = require('./form.cjs');
require('../form-detail/index.cjs');
var index = require('../form-detail/form-page/index.cjs');
var index$1 = require('../form-detail/form-item/index.cjs');
var index$2 = require('../form-detail/form-group-panel/index.cjs');
var index$3 = require('../form-detail/form-button/index.cjs');
var index$4 = require('../form-detail/form-druipart/index.cjs');
var index$5 = require('../form-detail/form-mdctrl/index.cjs');
var index$6 = require('../form-detail/form-rawitem/index.cjs');
var index$7 = require('../form-detail/form-tab-panel/index.cjs');
var index$8 = require('../form-detail/form-tab-page/index.cjs');
var index$9 = require('../form-detail/form-button-list/index.cjs');
var index$a = require('../form-detail/form-iframe/index.cjs');

"use strict";
const IBizFormControl = vue3Util.withInstall(form.FormControl, function(v) {
  v.component(form.FormControl.name, form.FormControl);
  v.use(index.IBizFormPage);
  v.use(index$1.IBizFormItem);
  v.use(index$2.IBizFormGroupPanel);
  v.use(index$3.IBizFormButton);
  v.use(index$4.IBizFormDRUIPart);
  v.use(index$5.IBizFormMDCtrl);
  v.use(index$6.IBizFormRawItem);
  v.use(index$7.IBizFormTabPanel);
  v.use(index$8.IBizFormTabPage);
  v.use(index$9.IBizFormButtonList);
  v.use(index$a.IBizFormIFrame);
});

exports.IBizFormControl = IBizFormControl;
exports.default = IBizFormControl;
