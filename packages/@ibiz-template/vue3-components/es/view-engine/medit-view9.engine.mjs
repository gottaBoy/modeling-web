import { MDViewEngine, SysUIActionTag } from '@ibiz-template/runtime';

"use strict";
class MEditView9Engine extends MDViewEngine {
  /**
   * 多数据部件名称
   * @author lxm
   * @date 2023-06-07 09:17:19
   * @readonly
   * @type {string}
   */
  get xdataControlName() {
    return "meditviewpanel";
  }
  get meditviewpanel() {
    return this.view.getController(
      "meditviewpanel"
    );
  }
  async onCreated() {
    await super.onCreated();
    if (!this.view.slotProps.meditviewpanel) {
      this.view.slotProps.meditviewpanel = {};
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  async call(key, args) {
    if (key === SysUIActionTag.NEW) {
      await this.meditviewpanel.handleAdd();
      return null;
    }
    if (key === SysUIActionTag.REFRESH) {
      return null;
    }
    return super.call(key, args);
  }
}

export { MEditView9Engine };
