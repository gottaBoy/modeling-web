import { EditViewEngine } from './edit-view.engine.mjs';

"use strict";
class EditView4Engine extends EditViewEngine {
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("drtab");
  }
  /**
   * 数据分页栏
   *
   * @readonly
   * @memberof EditView4Engine
   */
  get drtab() {
    return this.view.getController("drtab");
  }
}

export { EditView4Engine };
