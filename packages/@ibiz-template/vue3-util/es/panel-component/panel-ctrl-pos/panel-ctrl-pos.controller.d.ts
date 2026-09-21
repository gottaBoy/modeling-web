import { IControlController, PanelItemController, ViewLayoutPanelController } from '@ibiz-template/runtime';
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
export declare class PanelCtrlPosController extends PanelItemController<IPanelCtrlPos> {
    /**
     * 面板控制器
     *
     * @author lxm
     * @date 2022-08-24 22:08:59
     * @type {PanelController}
     */
    panel: ViewLayoutPanelController;
    /**
     * 部件占位对应部件控制器
     * @author lxm
     * @date 2023-08-09 10:41:38
     * @type {IControlController}
     */
    control?: IControlController;
    /**
     * 绑定部件控制器
     * @author lxm
     * @date 2023-08-09 10:42:30
     * @param {IControlController} controller
     */
    bindControl(controller: IControlController): void;
}
//# sourceMappingURL=panel-ctrl-pos.controller.d.ts.map