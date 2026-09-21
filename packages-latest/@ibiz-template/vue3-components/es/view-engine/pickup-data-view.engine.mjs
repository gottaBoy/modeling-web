import { ViewCallTag } from '@ibiz-template/runtime';
import { DataViewEngine } from './data-view.engine.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PickupDataViewEngine extends DataViewEngine {
  constructor() {
    super(...arguments);
    /**
     * @description 选中数据
     * @type {IData[]}
     * @memberof PickupDataViewEngine
     */
    __publicField(this, "selectData", []);
  }
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
    this.initSelectData();
  }
  /**
   * @description 初始化选中数据
   * @protected
   * @memberof PickupDataViewEngine
   */
  initSelectData() {
    if (this.view.params.selecteddata) {
      this.selectData = JSON.parse(this.view.params.selecteddata);
      delete this.view.params.selecteddata;
    }
    if (this.view.state.selectedData) {
      this.selectData = [...this.view.state.selectedData];
    }
  }
  async onMounted() {
    await super.onMounted();
    this.xdataControl.evt.on("onSelectionChange", async (event) => {
      this.view.evt.emit("onSelectionChange", { ...event });
    });
    this.xdataControl.evt.on("onActive", async (event) => {
      this.view.evt.emit("onDataActive", { ...event });
    });
    this.setSelectedData(this.selectData);
  }
  async call(key, args) {
    if (key === ViewCallTag.GET_ALL_DATA) {
      return this.dataview.state.items;
    }
    return super.call(key, args);
  }
}

export { PickupDataViewEngine };
