import { EditViewEngine } from './edit-view.engine.mjs';

"use strict";
class DEIndexViewEngine extends EditViewEngine {
  /**
   * 数据关系栏
   *
   * @author lxm
   * @date 2023-12-11 11:41:07
   * @readonly
   * @type {IDRBarController}
   */
  get drbar() {
    return this.view.getController("drbar");
  }
  /**
   * 当前路由视图的层级
   *
   * @author zk
   * @date 2023-07-11 10:07:20
   * @readonly
   * @type {(number | undefined)}
   * @memberof ExpBarControlController
   */
  get routeDepth() {
    return this.view.modal.routeDepth;
  }
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("drbar");
    if (!this.view.slotProps.drbar) {
      this.view.slotProps.drbar = {};
    }
    this.view.slotProps.drbar.showMode = "horizontal";
    this.view.slotProps.drbar.srfnav = this.view.state.srfnav;
    this.view.slotProps.drbar.hideEditItem = true;
  }
  /**
   * @description 监控form事件
   * @param {EventBase} event
   * @memberof DEIndexViewEngine
   */
  formDataStateChange(event) {
    var _a;
    const { evt } = this.view;
    const formDeId = this.form.model.appDataEntityId;
    const data = event.data[0];
    (_a = this.toolbar) == null ? void 0 : _a.calcButtonState(data, formDeId);
    if (data.srfkey) {
      evt.emit("onViewInfoChange", { dataInfo: data.srfmajortext || "" });
    }
  }
}

export { DEIndexViewEngine };
