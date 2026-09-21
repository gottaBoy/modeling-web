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
  async call(key, args) {
    if (key === SysUIActionTag.NEW) {
      await this.meditviewpanel.handleAdd();
      return null;
    }
    if (key === SysUIActionTag.SAVE) {
      const result = await this.meditviewpanel.save();
      return { data: result };
    }
    if (key === SysUIActionTag.SAVE_AND_EXIT) {
      await this.meditviewpanel.save();
      return { closeView: true };
    }
    if (key === SysUIActionTag.REFRESH) {
      return null;
    }
    return super.call(key, args);
  }
}

export { MEditView9Engine };
