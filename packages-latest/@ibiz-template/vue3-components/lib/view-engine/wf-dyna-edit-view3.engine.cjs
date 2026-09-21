'use strict';

var wfDynaEditView_engine = require('./wf-dyna-edit-view.engine.cjs');

"use strict";
class WFDynaEditView3Engine extends wfDynaEditView_engine.WFDynaEditViewEngine {
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

exports.WFDynaEditView3Engine = WFDynaEditView3Engine;
