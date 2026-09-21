import { SysUIActionTag } from '@ibiz-template/runtime';
import { WFDynaEditViewEngine } from './wf-dyna-edit-view.engine.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WFDynaActionViewEngine extends WFDynaEditViewEngine {
  constructor() {
    super(...arguments);
    __publicField(this, "isCalcWFToolbar", false);
  }
  async calcProcessFormName() {
    this.isEditable = this.view.context.isEditable === "true";
    const processForm = this.view.context.processForm ? "wfform_".concat(this.view.context.processForm) : "form";
    return processForm;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === SysUIActionTag.OK) {
      this.onOkButtonClick();
      return null;
    }
    if (key === SysUIActionTag.CANCEL) {
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
    if (this.view.context.isEditable) {
      await this.save({ silent: true });
    } else {
      this.form.state.modified = false;
    }
    await this.form.wfSubmit({});
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

export { WFDynaActionViewEngine };
