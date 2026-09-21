'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var kanban = require('./kanban.cjs');
var kanban_provider = require('./kanban.provider.cjs');

"use strict";
const IBizKanbanControl = vue3Util.withInstall(kanban.KanbanControl, function(v) {
  v.component(kanban.KanbanControl.name, kanban.KanbanControl);
  runtime.registerControlProvider(runtime.ControlType.KANBAN, () => new kanban_provider.KanbanProvider());
});

exports.IBizKanbanControl = IBizKanbanControl;
exports.default = IBizKanbanControl;
