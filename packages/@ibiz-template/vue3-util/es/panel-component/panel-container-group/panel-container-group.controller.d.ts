import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerGroupState } from './panel-container-group.state';
/**
 * 面板分组容器控制器
 *
 * @export
 * @class PanelContainerGroupController
 * @extends {PanelItemController}
 */
export declare class PanelContainerGroupController extends PanelItemController<IPanelContainer> {
    state: PanelContainerGroupState;
    protected createState(): PanelContainerGroupState;
    /**
     * 禁用关闭
     *
     * @author chitanda
     * @date 2022-09-14 14:09:51
     * @readonly
     * @type {boolean}
     */
    get disableClose(): boolean;
    /**
     * 是否默认展开分组
     *
     * @author chitanda
     * @date 2022-09-14 14:09:09
     * @readonly
     */
    get defaultExpansion(): boolean;
}
//# sourceMappingURL=panel-container-group.controller.d.ts.map