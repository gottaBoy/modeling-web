'use strict';

var runtime = require('@ibiz-template/runtime');
var dataView_engine = require('./data-view.engine.cjs');

"use strict";
class PickupDataViewEngine extends dataView_engine.DataViewEngine {
  /**
   * 表格控制器
   *
   * @author zk
   * @date 2023-05-26 05:05:43
   * @readonly
   * @memberof PickupDataViewViewEngine
   */
  get dataview() {
    return this.view.getController("dataview");
  }
  async onCreated() {
    super.onCreated();
    this.view.slotProps.dataview.singleSelect = this.view.state.singleSelect;
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
      return this.dataview.state.items;
    }
    return super.call(key, args);
  }
}

exports.PickupDataViewEngine = PickupDataViewEngine;
