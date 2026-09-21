import { ModelError } from '@ibiz-template/core';
import { FormMDCtrlRepeaterController, FormMDCtrlFormController, FormMDCtrlMDController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FormMDCtrlProvider {
  constructor() {
    __publicField(this, "component", "IBizFormMDCtrl");
  }
  async createController(detailModel, form, parent) {
    let c;
    switch (detailModel.contentType) {
      case "LIST":
      case "GRID":
      case "DATAVIEW":
        c = new FormMDCtrlMDController(detailModel, form, parent);
        break;
      case "FORM":
        c = new FormMDCtrlFormController(detailModel, form, parent);
        break;
      case "REPEATER":
        c = new FormMDCtrlRepeaterController(detailModel, form, parent);
        break;
      default:
        throw new ModelError(
          detailModel,
          "".concat(ibiz.i18n.t("control.form.formMDctrl.errorMessage", {
            contentType: detailModel.contentType
          }))
        );
    }
    await c.init();
    return c;
  }
}

export { FormMDCtrlProvider };
