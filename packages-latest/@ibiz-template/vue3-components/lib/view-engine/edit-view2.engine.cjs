'use strict';

var editView_engine = require('./edit-view.engine.cjs');

"use strict";
class EditView2Engine extends editView_engine.EditViewEngine {
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

exports.EditView2Engine = EditView2Engine;
