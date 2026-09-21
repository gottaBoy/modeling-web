'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var searchformButtons = require('./searchform-buttons.cjs');
var searchformButtons_provider = require('./searchform-buttons.provider.cjs');

"use strict";
const IBizSearchFormButtons = vue3Util.withInstall(
  searchformButtons.SearchFormButtons,
  function(v) {
    v.component(searchformButtons.SearchFormButtons.name, searchformButtons.SearchFormButtons);
    runtime.registerPanelItemProvider(
      "RAWITEM_SEARCHFORM_BUTTONS",
      () => new searchformButtons_provider.SearchFormButtonsProvider()
    );
  }
);

exports.IBizSearchFormButtons = IBizSearchFormButtons;
exports.default = IBizSearchFormButtons;
