import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController, PanelItemState } from '@ibiz-template/runtime';
import { TeleportPlaceholderState } from './teleport-placeholder.state';
/**
 * 传送占位控制器
 *
 * @export
 * @class PanelRawItemController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export declare class TeleportPlaceholderController extends PanelItemController<IPanelRawItem> {
    state: TeleportPlaceholderState;
    protected createState(): PanelItemState;
    /**
     * 初始化
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onInit(): Promise<void>;
}
//# sourceMappingURL=teleport-placeholder.controller.d.ts.map