'use strict';

var runtime = require('@ibiz-template/runtime');
var treeView_engine = require('./tree-view.engine.cjs');

"use strict";
class TreeGridExViewEngine extends treeView_engine.TreeViewEngine {
  get treeGridEx() {
    return this.view.getController("treegridex");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.SysUIActionTag.TOGGLE_ROW_EDIT) {
      this.treeGridEx.toggleRowEdit();
      return null;
    }
    if (key === runtime.SysUIActionTag.SAVE_ROW) {
      this.treeGridEx.save(args.data[0]);
      return null;
    }
    if (key === runtime.SysUIActionTag.SAVE) {
      this.treeGridEx.saveAll();
      return null;
    }
    if (key === runtime.SysUIActionTag.REFRESH) {
      this.treeGridEx.load();
      return null;
    }
    return super.call(key, args);
  }
}

exports.TreeGridExViewEngine = TreeGridExViewEngine;
