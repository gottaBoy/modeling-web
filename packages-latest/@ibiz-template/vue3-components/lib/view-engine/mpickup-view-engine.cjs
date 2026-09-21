'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var pickupView_engine = require('./pickup-view.engine.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MPickupViewEngine extends pickupView_engine.PickupViewEngine {
  constructor() {
    super(...arguments);
    /**
     * @description 是否严格的遵循穿梭空左右互相关联
     * @type {boolean}
     * @memberof MPickupViewEngine
     */
    __publicField(this, "checkStrictly", false);
  }
  /**
   * 简单列表控制器
   *
   * @author zk
   * @date 2023-05-26 03:05:43
   * @readonly
   * @memberof MPickupViewEngine
   */
  get simpleList() {
    return this.view.getController("simplelist");
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @author zk
   * @date 2023-05-26 05:05:36
   * @return {*}  {Promise<void>}
   * @memberof MPickupViewEngine
   */
  async onCreated() {
    await super.onCreated();
    if (!this.view.providers.simplelist) {
      throw new core.RuntimeModelError(
        this.view.model,
        ibiz.i18n.t("viewEngine.missingConfigErr")
      );
    }
    const { childNames } = this.view;
    childNames.push("simplelist");
    if (!this.view.slotProps.simplelist) {
      this.view.slotProps.simplelist = {};
    }
    if (!this.view.slotProps.pickupviewpanel) {
      this.view.slotProps.pickupviewpanel = {};
    }
    this.view.slotProps.simplelist.mdctrlActiveMode = 2;
    this.view.slotProps.simplelist.isSimple = true;
    this.view.slotProps.simplelist.singleSelect = false;
    this.view.slotProps.pickupviewpanel.singleSelect = false;
    if (this.view.params.checkstrictly) {
      this.checkStrictly = this.view.params.checkstrictly === "true" || this.view.params.checkstrictly === true;
      delete this.view.params.checkstrictly;
    }
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @author zk
   * @date 2023-05-26 05:05:27
   * @return {*}  {Promise<void>}
   * @memberof MPickupViewEngine
   */
  async onMounted() {
    await super.onMounted();
    this.simpleList.evt.on("onActive", (event) => {
      this.simpleListActive(event.data);
    });
    this.setSelectedData(this.selectData);
  }
  async call(key, args) {
    if (key === runtime.SysUIActionTag.CANCEL) {
      this.cancel();
      return null;
    }
    if (key === runtime.SysUIActionTag.OK) {
      this.confirm();
      return null;
    }
    if (key === runtime.SysUIActionTag.ADD_SELECTION) {
      this.addSelection();
      return null;
    }
    if (key === runtime.SysUIActionTag.ADD_ALL) {
      this.addAll();
      return null;
    }
    if (key === runtime.SysUIActionTag.REMOVE_ALL) {
      this.removeAll();
      return null;
    }
    if (key === runtime.SysUIActionTag.REMOVE_SELECTION) {
      this.removeSelection();
      return null;
    }
    return super.call(key, args);
  }
  /**
   *  选则面板激活数据
   *
   * @author zk
   * @date 2023-05-26 05:05:13
   * @param {*} data
   * @memberof PickupViewEngine
   */
  async pickupViewPanelDataActive(data) {
    await this.handlePushSimpleListItems(data);
  }
  /**
   * 列表激活
   *
   * @author zk
   * @date 2023-05-26 05:05:47
   * @param {IData[]} data
   * @memberof MPickupViewEngine
   */
  simpleListActive(data) {
    const items = this.simpleList.getAllData();
    data.forEach((item) => {
      const index = items.findIndex((_item) => _item.srfkey === item.srfkey);
      if (index !== -1) {
        items.splice(index, 1);
      }
    });
    this.setSelectedData(items);
  }
  /**
   * 添加选中
   *
   * @author zk
   * @date 2023-05-25 05:05:10
   * @memberof MPickupViewEngine
   */
  async addSelection() {
    const selectItem = await this.pickupViewPanel.getSelectedData();
    await this.handlePushSimpleListItems(selectItem);
  }
  /**
   * @description 处理添加简单列表数据
   * @protected
   * @param {IData[]} data
   * @memberof MPickupViewEngine
   */
  async handlePushSimpleListItems(data) {
    let selectItems = [];
    if (this.checkStrictly) {
      const items = await this.pickupViewPanel.getAllData();
      selectItems = this.simpleList.getAllData().filter(
        (selected) => !items.some((item) => item.srfkey === selected.srfkey)
      );
      selectItems.push(...data);
    } else {
      const allData = this.simpleList.getAllData();
      selectItems = [...allData, ...data];
    }
    const uniqueItems = this.handleUniqueItems(selectItems);
    this.setSelectedData(uniqueItems);
  }
  /**
   * 去重数组
   *
   * @author zk
   * @date 2023-05-26 03:05:08
   * @param {IData[]} arr
   * @return {*}
   * @memberof MPickupViewEngine
   */
  handleUniqueItems(arr) {
    const res = /* @__PURE__ */ new Map();
    return arr.filter(
      (item) => !res.has(item.srfkey) && res.set(item.srfkey, 1)
    );
  }
  /**
   * 添加所有
   *
   * @author zk
   * @date 2023-05-25 05:05:12
   * @memberof MPickupViewEngine
   */
  async addAll() {
    const allItems = await this.pickupViewPanel.getAllData();
    await this.handlePushSimpleListItems(allItems);
  }
  /**
   * 删除所有
   *
   * @author zk
   * @date 2023-05-25 05:05:14
   * @memberof MPickupViewEngine
   */
  removeAll() {
    this.setSelectedData([]);
  }
  /**
   * 删除选中
   *
   * @author zk
   * @date 2023-05-25 05:05:16
   * @memberof MPickupViewEngine
   */
  removeSelection() {
    const selectData = this.simpleList.getData();
    const items = this.simpleList.getAllData();
    selectData.forEach((_item) => {
      const index = items.findIndex(
        (item) => _item.srfkey === item.srfkey
      );
      if (index !== -1)
        items.splice(index, 1);
    });
    this.setSelectedData(items);
  }
  /**
   * @description 设置选中数据
   * @protected
   * @param {IData[]} items
   * @memberof MPickupViewEngine
   */
  setSelectedData(items) {
    if (this.checkStrictly)
      super.setSelectedData(items);
    this.simpleList.setData(items);
  }
  /**
   * 提交
   *
   * @author zk
   * @date 2023-05-25 06:05:42
   * @memberof MPickupViewEngine
   */
  confirm() {
    const items = this.simpleList.getAllData();
    this.view.closeView({ ok: true, data: items });
  }
}

exports.MPickupViewEngine = MPickupViewEngine;
