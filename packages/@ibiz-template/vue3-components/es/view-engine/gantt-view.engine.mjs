import { RuntimeError } from '@ibiz-template/core';
import { MDViewEngine, SysUIActionTag } from '@ibiz-template/runtime';

"use strict";
class GanttViewEngine extends MDViewEngine {
  get gantt() {
    return this.view.getController("gantt");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
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
    if (key === SysUIActionTag.EXPAND) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag) {
        const { selectedData } = this.gantt.state;
        const selectedGroup = selectedData.filter((x) => !x._leaf);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfnodeid;
        }
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.gantt.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag) {
        const { selectedData } = this.gantt.state;
        const selectedGroup = selectedData.filter((x) => !x._leaf);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfnodeid;
        }
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.gantt.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === SysUIActionTag.EXPANDALL) {
      this.gantt.changeCollapse({ expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSEALL) {
      this.gantt.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async onXDataActive(event) {
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
