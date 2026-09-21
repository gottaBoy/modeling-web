'use strict';

var ElementPlus = require('element-plus');

"use strict";
class ModalUtil {
  async info(params) {
    await ElementPlus.ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "info"
    });
  }
  async success(params) {
    await ElementPlus.ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "success"
    });
  }
  async warning(params) {
    await ElementPlus.ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "warning"
    });
  }
  async error(params) {
    await ElementPlus.ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "error"
    });
  }
  async confirm(params) {
    return new Promise((resolve) => {
      ElementPlus.ElMessageBox.confirm(params.desc, params.title, params).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
  async extendConfirm(params) {
    return new Promise((resolve) => {
      ElementPlus.ElMessageBox.confirm(params.desc, params.title, {
        ...params,
        ...params.options
      }).then(() => resolve("yes")).catch(
        (action) => resolve(action === "cancel" ? "no" : "cancel")
      );
    });
  }
}

exports.ModalUtil = ModalUtil;
