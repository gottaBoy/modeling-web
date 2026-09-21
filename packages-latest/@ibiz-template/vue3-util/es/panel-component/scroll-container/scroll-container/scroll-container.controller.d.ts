import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerController, ViewLayoutPanelController } from '@ibiz-template/runtime';
/**
 * @description 面板滚动容器控制器
 * @export
 * @class ScrollContainerController
 * @extends {PanelContainerController<IPanelContainer>}
 */
export declare class ScrollContainerController extends PanelContainerController<IPanelContainer> {
    /**
     * @description 视图布局面板部件控制器
     * @exposedoc
     * @export
     * @type {ViewLayoutPanelController}
     * @memberof ScrollContainerController
     */
    panel: ViewLayoutPanelController;
    protected onInit(): Promise<void>;
}
//# sourceMappingURL=scroll-container.controller.d.ts.map