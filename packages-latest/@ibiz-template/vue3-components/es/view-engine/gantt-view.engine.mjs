import { SysUIActionTag } from '@ibiz-template/runtime';
import { TreeGridExViewEngine } from './tree-grid-ex-view.engine.mjs';

"use strict";
class GanttViewEngine extends TreeGridExViewEngine {
  get gantt() {
    return this.view.getController("gantt");
  }
  async call(key, args) {
    if (key === SysUIActionTag.NEW_ROW) {
      this.gantt.newRow(args);
      return null;
    }
    if (key === SysUIActionTag.TOGGLE_ROW_EDIT) {
      this.gantt.toggleRowEdit();
      return null;
    }
    if (key === SysUIActionTag.SAVE_ROW) {
      this.gantt.save(args.data[0]);
      return null;
    }
    if (key === SysUIActionTag.SAVE) {
      this.gantt.saveAll();
      return null;
    }
    if (key === SysUIActionTag.REFRESH) {
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

export { GanttViewEngine };
