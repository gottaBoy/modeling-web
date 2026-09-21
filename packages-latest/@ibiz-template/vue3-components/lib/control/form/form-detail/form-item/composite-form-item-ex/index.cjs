'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var compositeFormItemEx_provider = require('./composite-form-item-ex.provider.cjs');
var compositeFormItemEx = require('./composite-form-item-ex.cjs');

"use strict";
var CompositeFormItemEX = {
  install: (v) => {
    v.component(compositeFormItemEx.CompositeFormItemEx.name, compositeFormItemEx.CompositeFormItemEx);
    runtime.registerFormDetailProvider(
      "FORM_USERCONTROL_COMPOSITE_FORM_ITEM_EX",
      () => new compositeFormItemEx_provider.CompositeFormItemExProvider()
    );
  }
};

exports.default = CompositeFormItemEX;
