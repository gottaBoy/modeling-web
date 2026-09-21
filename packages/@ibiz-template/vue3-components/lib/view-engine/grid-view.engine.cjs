'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
class GridViewEngine extends runtime.MDViewEngine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.SysUIActionTag.NEW_ROW) {
      this.grid.newRow();
      return null;
    }
    if (key === runtime.SysUIActionTag.TOGGLE_ROW_EDIT) {
      this.grid.toggleRowEdit();
      return null;
    }
    if (key === runtime.SysUIActionTag.SAVE || key === runtime.SysUIActionTag.SAVE_ROW) {
      this.grid.saveAll();
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPAND) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag) {
        const { selectedData } = this.grid.state;
        const selectedGroup = selectedData.filter((x) => x.isGroupData);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfkey;
        }
      }
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.grid.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag) {
        const { selectedData } = this.grid.state;
        const selectedGroup = selectedData.filter((x) => x.isGroupData);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfkey;
        }
      }
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.grid.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPANDALL) {
      this.grid.changeCollapse({ expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSEALL) {
      this.grid.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
  get grid() {
    return this.view.getController("grid");
  }
  async onCreated() {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.grid) {
      this.view.slotProps.grid = {};
    }
    this.view.slotProps.grid.mdctrlActiveMode = model.gridRowActiveMode;
    this.view.slotProps.grid.rowEditOpen = model.rowEditDefault;
  }
}

exports.GridViewEngine = GridViewEngine;
