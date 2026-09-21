import { WFDynaEditViewEngine } from './wf-dyna-edit-view.engine.mjs';

"use strict";
class WFDynaEditView3Engine extends WFDynaEditViewEngine {
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("drtab");
  }
  /**
   * 数据分页栏
   *
   * @readonly
   * @memberof EditView3Engine
   */
  get drtab() {
    return this.view.getController("drtab");
  }
}

export { WFDynaEditView3Engine };
