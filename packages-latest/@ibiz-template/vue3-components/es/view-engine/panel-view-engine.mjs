import { ViewEngineBase } from '@ibiz-template/runtime';

"use strict";
class PanelViewEngine extends ViewEngineBase {
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("panel");
  }
  /**
   * 面板部件
   *
   * @readonly
   * @memberof PanelViewEngine
   */
  get panel() {
    return this.view.getController("panel");
  }
  async onMounted() {
    await super.onMounted();
    if (this.view.model.appDataEntityId) {
      await this.loadEntityData();
    }
  }
}

export { PanelViewEngine };
