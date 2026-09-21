'use strict';

var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var gridView_engine = require('./grid-view.engine.cjs');

"use strict";
class TreeGridViewEngine extends gridView_engine.GridViewEngine {
  /**
   * 多数据部件名称
   *
   * @author zk
   * @date 2023-10-07 06:10:44
   * @readonly
   * @type {string}
   * @memberof TreeGridViewEngine
   */
  get xdataControlName() {
    return "treegrid";
  }
  get treeGrid() {
    return this.view.getController("treegrid");
  }
  async onCreated() {
    await super.onCreated();
    if (!this.view.slotProps.treegrid) {
      this.view.slotProps.treegrid = this.view.slotProps.grid;
    } else {
      Object.assign(this.view.slotProps.treegrid, this.view.slotProps.grid);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.SysUIActionTag.EXPAND) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag) {
        const { selectedData } = this.treeGrid.state;
        const selectedGroup = selectedData.filter((x) => x.hasChildren);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfkey;
        }
      }
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noExpandTag"));
      }
      this.treeGrid.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || "";
      if (!tag) {
        const { selectedData } = this.treeGrid.state;
        const selectedGroup = selectedData.filter((x) => x.hasChildren);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfkey;
        }
      }
      if (!tag) {
        throw new core.RuntimeError(ibiz.i18n.t("viewEngine.noCollapseTag"));
      }
      this.treeGrid.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === runtime.SysUIActionTag.EXPANDALL) {
      this.treeGrid.changeCollapse({ expand: true });
      return null;
    }
    if (key === runtime.SysUIActionTag.COLLAPSEALL) {
      this.treeGrid.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
}

exports.TreeGridViewEngine = TreeGridViewEngine;
