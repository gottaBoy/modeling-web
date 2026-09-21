import { IHttpResponse } from '@ibiz-template/core';
import { EditorController, IAcItemProvider, IButtonContainerState } from '@ibiz-template/runtime';
import { IAppDEACMode, IAppDEUIActionGroupDetail, IAutoComplete, IDEACModeDataItem, IUIActionGroupDetail } from '@ibiz/model-core';
/**
 * 自动完成编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export declare class AutoCompleteEditorController extends EditorController<IAutoComplete> {
    /**
     * 主键属性名称
     */
    keyName: string;
    /**
     * 主文本属性名称
     */
    textName: string;
    /**
     * 数据集codeName
     */
    interfaceName: string;
    /**
     * 自填模式sort排序
     */
    sort: string | undefined;
    /**
     * 实体自填模式模型
     */
    deACMode: IAppDEACMode | undefined;
    /**
     * 自填数据项集合（已排除了value和text)
     */
    dataItems: IDEACModeDataItem[];
    /**
     * 自填列表项适配器
     *
     * @author zhanghengfeng
     * @date 2024-05-21 17:05:21
     * @type {IAcItemProvider}
     */
    acItemProvider?: IAcItemProvider;
    /**
     * 分组行为状态
     */
    groupActionState: IButtonContainerState;
    /**
     * @description 自填模式行为行为组
     * @type {IAppDEUIActionGroupDetail[]}
     * @memberof AutoCompleteEditorController
     */
    actionDetails: IAppDEUIActionGroupDetail[];
    protected onInit(): Promise<void>;
    /**
     * 加载实体数据集数据
     *
     * @param {string} query 模糊匹配字符串
     * @param {IData} data 表单数据
     * @returns {*}  {Promise<IHttpResponse<IData[]>>}
     * @memberof AutoCompleteEditorController
     */
    getServiceData(query: string, data: IData): Promise<IHttpResponse<IData[]>>;
    /**
     * 计算回填数据
     *
     * @author lxm
     * @date 2022-10-24 16:10:24
     * @param {IData} data 选中数据
     * @returns {*}  {Promise<Array<{ id: string; value: any }>>}
     */
    calcFillDataItems(data: IData): Promise<Array<{
        id: string;
        value: any;
    }>>;
    /**
     * @description 分组行为项点击
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof AutoCompleteEditorController
     */
    onActionClick(detail: IUIActionGroupDetail, data: IData, event?: MouseEvent): Promise<void>;
}
