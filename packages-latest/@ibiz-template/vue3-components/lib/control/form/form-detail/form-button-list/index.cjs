'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var formButtonList_provider = require('./form-button-list.provider.cjs');
var formButtonList = require('./form-button-list.cjs');

"use strict";
const IBizFormButtonList = vue3Util.withInstall(
  formButtonList.FormButtonList,
  function(v) {
    v.component(formButtonList.FormButtonList.name, formButtonList.FormButtonList);
    runtime.registerFormDetailProvider(
      "BUTTONLIST",
      () => new formButtonList_provider.FormButtonListProvider()
    );
  }
);

exports.IBizFormButtonList = IBizFormButtonList;
exports.default = IBizFormButtonList;
