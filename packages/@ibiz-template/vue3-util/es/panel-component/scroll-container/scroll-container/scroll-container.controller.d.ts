import { IPanelContainer } from '@ibiz/model-core';
import { PanelItemController, ViewLayoutPanelController } from '@ibiz-template/runtime';
/**
 * 面板滚动容器控制器
 *
 * @author lxm
 * @date 2023-02-07 06:05:23
 * @export
 * @class PanelButtonController
 * @extends {PanelItemController}
 */
export declare class ScrollContainerController extends PanelItemController<IPanelContainer> {
    /**
     * 面板控制器
     *
     * @author lxm
     * @date 2022-08-24 22:08:59
     * @type {PanelController}
     */
    panel: ViewLayoutPanelController;
    protected onInit(): Promise<void>;
}
//# sourceMappingURL=scroll-container.controller.d.ts.map