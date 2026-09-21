import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
/**
 * @description 面板直接内容控制器
 * @class PanelRawItemController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export declare class PanelRawItemController extends PanelItemController<IPanelRawItem> {
    /**
     * @description 父容器数据对象数据
     * @exposedoc
     * @readonly
     * @type {IData}
     * @memberof PanelRawItemController
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
    /**
     * @description 计算动态样式表
     * @protected
     * @param {IData} data
     * @memberof PanelRawItemController
     */
    protected calcDynaClass(data: IData): void;
}
//# sourceMappingURL=panel-rawitem.controller.d.ts.map