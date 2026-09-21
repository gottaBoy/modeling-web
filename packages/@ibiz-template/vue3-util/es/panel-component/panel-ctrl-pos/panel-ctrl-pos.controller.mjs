import { PanelItemController } from '@ibiz-template/runtime';

"use strict";
class PanelCtrlPosController extends PanelItemController {
  /**
   * 绑定部件控制器
   * @author lxm
   * @date 2023-08-09 10:42:30
   * @param {IControlController} controller
   */
  bindControl(controller) {
    this.control = controller;
    controller.evt.onAll((eventName, event) => {
      this.panel.evt.emit("onControlEvent", {
        triggerControlName: this.model.id,
        triggerEventName: eventName,
        triggerEvent: event
      });
    });
  }
}

export { PanelCtrlPosController };
