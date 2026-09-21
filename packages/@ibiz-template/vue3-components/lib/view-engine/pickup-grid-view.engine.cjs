'use strict';

var runtime = require('@ibiz-template/runtime');
var gridView_engine = require('./grid-view.engine.cjs');

"use strict";
class PickupGridViewEngine extends gridView_engine.GridViewEngine {
  /**
   * 表格控制器
   *
   * @author zk
   * @date 2023-05-26 05:05:43
   * @readonly
   * @memberof PickupGridViewEngine
   */
  get grid() {
    return this.view.getController("grid");
  }
  async onCreated() {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.grid) {
      this.view.slotProps.grid = {};
    }
    this.view.slotProps.grid.singleSelect = this.view.state.singleSelect;
    this.view.slotProps.grid.mdctrlActiveMode = model.gridRowActiveMode;
  }
  async onMounted() {
    await super.onMounted();
    this.xdataControl.evt.on("onSelectionChange", async (event) => {
      this.view.evt.emit("onSelectionChange", { ...event });
    });
    this.xdataControl.evt.on("onActive", async (event) => {
      this.view.evt.emit("onDataActive", { ...event });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.ViewCallTag.GET_ALL_DATA) {
      return this.grid.state.items;
    }
    return super.call(key, args);
  }
}

exports.PickupGridViewEngine = PickupGridViewEngine;
