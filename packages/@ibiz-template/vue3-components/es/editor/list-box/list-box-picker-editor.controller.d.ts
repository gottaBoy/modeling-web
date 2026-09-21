import { IHttpResponse } from '@ibiz-template/core';
import { EditorController, IAcItemProvider } from '@ibiz-template/runtime';
import { IAppDEACMode, IListBoxPicker } from '@ibiz/model-core';
/**
 * 列表框picker编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export declare class ListBoxPickerEditorController extends EditorController<IListBoxPicker> {
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
     * 实体自填模式模型
     *
     * @author zhanghengfeng
     * @date 2024-05-21 17:05:03
     * @type {IAppDEACMode}
     */
    deACMode?: IAppDEACMode;
    /**
     * 自填列表项适配器
     *
     * @author zhanghengfeng
     * @date 2024-05-21 17:05:25
     * @type {IAcItemProvider}
     */
    acItemProvider?: IAcItemProvider;
    protected onInit(): Promise<void>;
    /**
     * 加载实体数据集数据
     *
     * @param {string} query 模糊匹配字符串
     * @param {IData} data 表单数据
     * @returns {*}  {Promise<IHttpResponse<IData[]>>}
     * @memberof PickerEditorController
     */
    getServiceData(data: IData): Promise<IHttpResponse<IData[]>>;
}
