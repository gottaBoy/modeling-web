import { ElMessageBox } from 'element-plus';

"use strict";
class ModalUtil {
  async info(params) {
    await ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "info"
    });
  }
  async success(params) {
    await ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "success"
    });
  }
  async warning(params) {
    await ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "warning"
    });
  }
  async error(params) {
    await ElMessageBox.alert(params.desc, params.title, {
      ...params.options,
      type: "error"
    });
  }
  async confirm(params) {
    return new Promise((resolve) => {
      ElMessageBox.confirm(params.desc, params.title, params).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
  async extendConfirm(params) {
    return new Promise((resolve) => {
      ElMessageBox.confirm(params.desc, params.title, {
        ...params,
        ...params.options
      }).then(() => resolve("yes")).catch(
        (action) => resolve(action === "cancel" ? "no" : "cancel")
      );
    });
  }
}

export { ModalUtil };
