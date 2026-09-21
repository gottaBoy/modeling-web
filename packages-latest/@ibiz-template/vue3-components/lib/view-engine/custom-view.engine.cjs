'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CustomViewEngine extends runtime.ViewEngineBase {
  constructor() {
    super(...arguments);
    /**
     * 部件集合
     *
     * @type {IControl[]}
     * @memberof CustomViewEngine
     */
    __publicField(this, "controls", []);
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof CustomViewEngine
   */
  async onCreated() {
    await super.onCreated();
    this.controls = runtime.getControlsByView(this.view.model);
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof CustomViewEngine
   */
  async onMounted() {
    await super.onMounted();
    this.calcToolbarState = this.calcToolbarState.bind(this);
    this.controls.forEach((ctrl) => {
      const control = this.view.getController(
        ctrl.name
      );
      control == null ? void 0 : control.evt.on(
        "onLoadSuccess",
        (evt) => this.calcToolbarButtonState(ctrl, void 0, evt)
      );
      control == null ? void 0 : control.evt.on(
        "onSelectionChange",
        (evt) => this.calcToolbarButtonState(ctrl, evt.data[0], evt)
      );
      control == null ? void 0 : control.evt.on(
        "onRefreshSuccess",
        (evt) => this.calcToolbarButtonState(ctrl, evt.data[0], evt)
      );
    });
  }
  /**
   * 计算工具栏按钮状态
   *
   * @param {IMDControl} control 数据部件模型
   * @param {(IData | undefined)} data 数据
   * @memberof CustomViewEngine
   */
  calcToolbarButtonState(control, data, _params) {
    const model = this.controls.find(
      (ctrl) => {
        var _a;
        return ctrl.controlType === "TOOLBAR" && ((_a = ctrl.xdataControlName) == null ? void 0 : _a.toLowerCase()) === control.name;
      }
    );
    if (model) {
      const toolbar = this.view.getController(
        model.name
      );
      toolbar == null ? void 0 : toolbar.calcButtonState(data, control.appDataEntityId, _params);
    }
  }
  async call(key, args) {
    var _a;
    if (key === runtime.SysUIActionTag.REFRESH) {
      await ((_a = this.viewLayoutPanel) == null ? void 0 : _a.load());
      return null;
    }
    return super.call(key, args);
  }
}

exports.CustomViewEngine = CustomViewEngine;
