'use strict';

var editView_engine = require('./edit-view.engine.cjs');

"use strict";
class EditView4Engine extends editView_engine.EditViewEngine {
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

exports.EditView4Engine = EditView4Engine;
