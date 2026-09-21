import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerState } from './panel-container.state';
/**
 * 面板容器控制器
 *
 * @export
 * @class PanelContainerController
 * @extends {PanelItemController}
 */
export declare class PanelContainerController extends PanelItemController<IPanelContainer> {
    state: PanelContainerState;
    protected createState(): PanelContainerState;
}
//# sourceMappingURL=panel-container.controller.d.ts.map