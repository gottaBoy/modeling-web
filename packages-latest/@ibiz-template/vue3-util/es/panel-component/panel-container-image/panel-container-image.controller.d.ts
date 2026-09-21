import { PanelContainerController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerImageState } from './panel-container-image.state';
/**
 * 面板图片容器控制器
 *
 * @export
 * @class PanelContainerImageController
 * @extends {PanelContainerController}
 */
export declare class PanelContainerImageController extends PanelContainerController<IPanelContainer> {
    /**
     * @description 状态
     * @exposedoc
     * @type {PanelContainerImageState}
     * @memberof PanelContainerImageController
     */
    state: PanelContainerImageState;
    protected createState(): PanelContainerImageState;
}
//# sourceMappingURL=panel-container-image.controller.d.ts.map