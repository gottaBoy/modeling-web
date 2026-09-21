'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var indexActions = require('./index-actions.cjs');
var indexActions_provider = require('./index-actions.provider.cjs');

"use strict";
const IBizIndexActions = vue3Util.withInstall(indexActions.IndexActions, function(v) {
  v.component(indexActions.IndexActions.name, indexActions.IndexActions);
  runtime.registerPanelItemProvider(
    "CONTAINER_INDEX_ACTIONS",
    () => new indexActions_provider.IndexActionsProvider()
  );
});

exports.IBizIndexActions = IBizIndexActions;
exports.default = IBizIndexActions;
