import {
  IControlController,
  PanelItemController,
  ViewLayoutPanelController,
} from '@ibiz-template/runtime';
import { IPanelCtrlPos } from '@ibiz/model-core';

/**
 * 面板控件占位控制器
 *
 * @author lxm
 * @date 2023-02-07 06:05:23
 * @export
 * @class PanelButtonController
 * @extends {PanelItemController}
 */
export class PanelCtrlPosController extends PanelItemController<IPanelCtrlPos> {
  /**
   * @description 面板控制器
   * @exposedoc
   * @type {PanelController}
   */
  declare panel: ViewLayoutPanelController;

  /**
   * @description 部件控制器
   * @exposedoc
   * @type {IControlController}
   */
  control?: IControlController;

  /**
   * 绑定部件控制器
   * @author lxm
   * @date 2023-08-09 10:42:30
   * @param {IControlController} controller
   */
  bindControl(controller: IControlController): void {
    this.control = controller;

    // 绑定部件，并监听所有事件，通过面板转发部件的事件。
    controller.evt.onAll((eventName, event) => {
      this.panel.evt.emit('onControlEvent', {
        triggerControlName: this.model.id!,
        triggerEventName: eventName,
        triggerEvent: event,
      });
    });
  }
}
