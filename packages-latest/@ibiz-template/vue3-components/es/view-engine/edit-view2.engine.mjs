import { EditViewEngine } from './edit-view.engine.mjs';

"use strict";
class EditView2Engine extends EditViewEngine {
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("drbar");
    if (!this.view.slotProps.drbar) {
      this.view.slotProps.drbar = {};
    }
    this.view.slotProps.drbar.srfnav = this.view.state.srfnav;
  }
  /**
   * 数据关系栏
   *
   * @readonly
   * @memberof EditView2Engine
   */
  get drbar() {
    return this.view.getController("drbar");
  }
}

export { EditView2Engine };
