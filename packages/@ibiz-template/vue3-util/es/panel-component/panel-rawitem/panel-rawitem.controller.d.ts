import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
/**
 * 面板按钮控制器
 *
 * @export
 * @class PanelRawItemController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export declare class PanelRawItemController extends PanelItemController<IPanelRawItem> {
    /**
     * 父容器数据对象数据
     * @author lxm
     * @date 2023-07-15 01:33:58
     * @readonly
     * @type {IData}
     */
    get data(): IData;
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
//# sourceMappingURL=panel-rawitem.controller.d.ts.map