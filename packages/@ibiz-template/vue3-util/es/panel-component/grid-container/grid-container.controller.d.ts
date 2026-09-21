import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { GridContainerState } from './grid-container.state';
/**
 * 面板栅格容器控制器
 *
 * @export
 * @class GridContainerController
 * @extends {PanelItemController}
 */
export declare class GridContainerController extends PanelItemController<IPanelContainer> {
    state: GridContainerState;
    protected createState(): GridContainerState;
}
//# sourceMappingURL=grid-container.controller.d.ts.map