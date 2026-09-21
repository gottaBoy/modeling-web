import { IDEMultiEditViewPanel } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiMEditViewPanelState, IApiPanelUiItem } from '../../state';
import { IApiMDControlController } from './i-api-md-control.controller';
import { IApiViewController } from '../view';
import { IApiFormSaveParams } from './i-api-edit-form.controller';
/**
 * 多编辑视图面板
 * @description 支持多个编辑视图同时存在并可执行新建、编辑、删除等操作。
 * @primary
 * @export
 * @interface IApiMEditViewPanelController
 * @extends {IApiMDControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiMEditViewPanelController<T extends IDEMultiEditViewPanel = IDEMultiEditViewPanel, S extends IApiMEditViewPanelState = IApiMEditViewPanelState> extends IApiMDControlController<T, S> {
    /**
     * @description 嵌入视图集合,key为IApiPanelUiItem项id，value为对应的视图控制器
     * @type {Map<string, IApiViewController>}
     * @memberof IApiMEditViewPanelController
     */
    embedViews: Map<string, IApiViewController>;
    /**
     * @description 添加项
     * @returns {*}  {Promise<void>}
     * @memberof IApiMEditViewPanelController
     */
    handleAdd(): Promise<void>;
    /**
     * @description 删除项
     * @param {IApiPanelUiItem} item 项数据
     * @returns {*}  {Promise<void>}
     * @memberof IApiMEditViewPanelController
     */
    handleDelete(item: IApiPanelUiItem): Promise<void>;
    /**
     * @description 获取激活视图
     * @returns {*}  {(IApiViewController | undefined)}
     * @memberof IApiMEditViewPanelController
     */
    getActiveView(): IApiViewController | undefined;
    /**
     * @description 保存表单数据
     * @param {IApiFormSaveParams} [args] 保存参数
     * @returns {*}  {Promise<IApiData[]>}
     * @memberof IApiMEditViewPanelController
     */
    save(args?: IApiFormSaveParams): Promise<IApiData[]>;
}
//# sourceMappingURL=i-api-medit-view-panel.controller.d.ts.map