'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var searchForm = require('./search-form.cjs');
var searchForm_provider = require('./search-form.provider.cjs');

"use strict";
const IBizSearchFormControl = vue3Util.withInstall(
  searchForm.SearchFormControl,
  function(v) {
    v.component(searchForm.SearchFormControl.name, searchForm.SearchFormControl);
    runtime.registerControlProvider(
      runtime.ControlType.SEARCHFORM,
      () => new searchForm_provider.SearchFormProvider()
    );
  }
);

exports.IBizSearchFormControl = IBizSearchFormControl;
exports.default = IBizSearchFormControl;
