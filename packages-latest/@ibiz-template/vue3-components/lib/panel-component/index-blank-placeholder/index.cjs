'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var indexBlankPlaceholder = require('./index-blank-placeholder.cjs');
var indexBlankPlaceholder_provider = require('./index-blank-placeholder.provider.cjs');
var indexBlankPlaceholder_controller = require('./index-blank-placeholder.controller.cjs');

"use strict";
const IBizIndexBlankPlaceholder = vue3Util.withInstall(
  indexBlankPlaceholder.IndexBlankPlaceholder,
  function(v) {
    v.component(indexBlankPlaceholder.IndexBlankPlaceholder.name, indexBlankPlaceholder.IndexBlankPlaceholder);
    runtime.registerPanelItemProvider(
      "CONTAINER_INDEX_BLANK_PLACEHOLDER",
      () => new indexBlankPlaceholder_provider.IndexBlankPlaceholderProvider()
    );
  }
);

exports.IndexBlankPlaceholderController = indexBlankPlaceholder_controller.IndexBlankPlaceholderController;
exports.IBizIndexBlankPlaceholder = IBizIndexBlankPlaceholder;
exports.default = IBizIndexBlankPlaceholder;
