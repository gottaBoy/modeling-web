'use strict';

var runtime = require('@ibiz-template/runtime');
var wfDynaEditView_engine = require('./wf-dyna-edit-view.engine.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WFDynaStartViewEngine extends wfDynaEditView_engine.WFDynaEditViewEngine {
  constructor() {
    super(...arguments);
    __publicField(this, "isCalcWFToolbar", false);
  }
  async calcProcessFormName() {
    this.isEditable = this.view.context.isEditable === "true";
    const processForm = this.view.context.processForm ? "wfform_".concat(this.view.context.processForm) : "form";
    return processForm;
  }
  async call(key, args) {
    if (key === runtime.SysUIActionTag.OK) {
      this.onOkButtonClick();
      return null;
    }
    if (key === runtime.SysUIActionTag.CANCEL) {
      await this.onCancelButtonClick();
      return null;
    }
    return super.call(key, args);
  }
  /**
   * 确认按钮回调
   *
   * @author lxm
   * @date 2022-09-12 20:09:13
   */
  async onOkButtonClick() {
    await this.save({ silent: true });
    await this.form.wfStart({});
    await this.view.closeView({ ok: true, data: this.getData() });
  }
  /**
   * 取消按钮回调
   *
   * @author lxm
   * @date 2022-09-12 20:09:00
   */
  async onCancelButtonClick() {
    await this.view.closeView({ ok: false, data: [] });
  }
}

exports.WFDynaStartViewEngine = WFDynaStartViewEngine;
