'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class WizardViewEngine extends runtime.ViewEngineBase {
  /**
   * 数据视图（卡片）部件
   *
   * @readonly
   * @memberof WizardViewEngine
   */
  get wizardPanel() {
    return this.view.getController("wizardpanel");
  }
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("wizardpanel");
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @memberof WizardViewEngine
   */
  async onMounted() {
    await super.onMounted();
    if (!this.view.slotProps.wizardpanel) {
      this.view.slotProps.wizardpanel = {};
    }
    this.wizardPanel.initialize();
    this.wizardPanel.evt.on("onFinishSuccess", (event) => {
      this.view.closeView({ ok: true, data: event.data });
    });
  }
}

exports.WizardViewEngine = WizardViewEngine;
