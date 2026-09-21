import { ViewCallTag } from '@ibiz-template/runtime';
import { TreeViewEngine } from './tree-view.engine.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PickupTreeViewEngine extends TreeViewEngine {
  constructor() {
    super(...arguments);
    /**
     * @description 选中数据
     * @type {IData[]}
     * @memberof PickupTreeViewEngine
     */
    __publicField(this, "selectData", []);
  }
  /**
   * 创建完成
   *
   * @author zk
   * @date 2023-05-26 05:05:35
   * @memberof PickupGridViewEngine
   */
  async onCreated() {
    super.onCreated();
    if (!this.view.slotProps.tree) {
      this.view.slotProps.tree = {};
    }
    this.view.slotProps.tree.singleSelect = this.view.state.singleSelect;
    this.view.slotProps.tree.checkStrictly = this.view.state.checkStrictly;
    this.initSelectData();
  }
  /**
   * @description 初始化选中数据
   * @protected
   * @memberof PickupTreeViewEngine
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
  /**
   * 挂载完成
   *
   * @author zk
   * @date 2023-05-26 10:05:13
   * @memberof PickupGridViewEngine
   */
  async onMounted() {
    const { model } = this.view;
    this.xdataControl.evt.on("onSelectionChange", async (event) => {
      this.view.evt.emit("onSelectionChange", { ...event });
    });
    this.xdataControl.evt.on("onActive", async (event) => {
      this.view.evt.emit("onDataActive", { ...event });
    });
    if (!this.view.state.noLoadDefault && model.loadDefault) {
      this.load();
    }
    this.setSelectedData(this.selectData);
  }
  /**
   * @description 获取所有数据
   * @protected
   * @returns {*}  {ITreeNodeData[]}
   * @memberof PickupTreeViewEngine
   */
  getAllData() {
    const { state, model } = this.tree;
    const { enableRootSelect, rootVisible, detreeNodes } = model;
    let items = state.items.filter((item) => !item._disableSelect);
    if (!enableRootSelect && !rootVisible && (detreeNodes == null ? void 0 : detreeNodes.length)) {
      const rootNode = detreeNodes.find((node) => node.rootNode === true);
      items = items.filter((item) => (rootNode == null ? void 0 : rootNode.id) !== item._nodeId);
    }
    return items;
  }
  async call(key, args) {
    if (key === ViewCallTag.GET_ALL_DATA) {
      return this.getAllData();
    }
    return super.call(key, args);
  }
}

export { PickupTreeViewEngine };
