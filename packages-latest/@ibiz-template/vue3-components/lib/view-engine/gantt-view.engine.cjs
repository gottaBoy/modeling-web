'use strict';

var runtime = require('@ibiz-template/runtime');
var treeGridExView_engine = require('./tree-grid-ex-view.engine.cjs');

"use strict";
class GanttViewEngine extends treeGridExView_engine.TreeGridExViewEngine {
  get gantt() {
    return this.view.getController("gantt");
  }
  async call(key, args) {
    if (key === runtime.SysUIActionTag.NEW_ROW) {
      this.gantt.newRow(args);
      return null;
    }
    if (key === runtime.SysUIActionTag.TOGGLE_ROW_EDIT) {
      this.gantt.toggleRowEdit();
      return null;
    }
    if (key === runtime.SysUIActionTag.SAVE_ROW) {
      this.gantt.save(args.data[0]);
      return null;
    }
    if (key === runtime.SysUIActionTag.SAVE) {
      this.gantt.saveAll();
      return null;
    }
    if (key === runtime.SysUIActionTag.REFRESH) {
      await this.gantt.refresh();
      return null;
    }
    return super.call(key, args);
  }
  async onCreated() {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.gantt) {
      this.view.slotProps.gantt = {};
    }
    this.view.slotProps.gantt.mdctrlActiveMode = model.mdctrlActiveMode;
  }
}

exports.GanttViewEngine = GanttViewEngine;
