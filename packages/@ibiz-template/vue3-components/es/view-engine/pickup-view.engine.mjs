import { ViewEngineBase, SysUIActionTag } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PickupViewEngine extends ViewEngineBase {
  constructor() {
    super(...arguments);
    /**
     * 选中数据
     *
     * @type {IData[]}
     * @memberof PickupViewEngine
     */
    __publicField(this, "selectData", []);
  }
  /**
   * 选择视图面板
   *
   * @readonly
   * @memberof PickupViewEngine
   */
  get pickupViewPanel() {
    return this.view.getController(
      "pickupviewpanel"
    );
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupViewEngine
   */
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("pickupviewpanel");
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupViewEngine
   */
  async onMounted() {
    await super.onMounted();
    this.pickupViewPanel.state.singleSelect = true;
    this.pickupViewPanel.evt.on("onSelectionChange", (event) => {
      this.selectData = event.data;
    });
    this.pickupViewPanel.evt.on("onDataActive", (event) => {
      this.pickupViewPanelDataActive(event.data);
    });
  }
  /**
   *  选则面板激活数据
   *
   * @author zk
   * @date 2023-05-26 05:05:13
   * @param {*} data
   * @memberof PickupViewEngine
   */
  pickupViewPanelDataActive(data) {
    this.selectData = data;
    this.view.closeView({ ok: true, data: this.selectData });
  }
  async call(key, args) {
    if (key === SysUIActionTag.CANCEL) {
      this.cancel();
      return null;
    }
    if (key === SysUIActionTag.OK) {
      this.confirm();
      return null;
    }
    return super.call(key, args);
  }
  /**
   * 确认
   *
   * @memberof PickupViewEngine
   */
  confirm() {
    this.view.closeView({ ok: true, data: this.selectData });
  }
  /**
   * 取消
   *
   * @memberof PickupViewEngine
   */
  cancel() {
    this.view.closeView({ ok: false, data: [] });
  }
}

export { PickupViewEngine };
