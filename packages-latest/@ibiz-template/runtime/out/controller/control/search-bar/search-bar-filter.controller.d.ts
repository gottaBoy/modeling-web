import { IAppDataEntity, ISearchBarFilter } from '@ibiz/model-core';
import { IEditorProvider, IFilterNodeField, IEditorController, IEditorContainerController, IApiSearchBarFilterController } from '../../../interface';
/** 不需要编辑器的OP */
export declare const ExcludeOPs: string[];
export interface ISearchFilterContainer {
    context: IContext;
    params: IParams;
    appDataEntity: IAppDataEntity;
}
/**
 * 搜索栏过滤项控制器
 * @author lxm
 * @date 2023-10-12 05:49:19
 * @export
 * @class SearchBarFilterController
 * @implements {IEditorContainerController}
 */
export declare class SearchBarFilterController implements IApiSearchBarFilterController, IEditorContainerController {
    model: ISearchBarFilter;
    appDataEntity: IAppDataEntity;
    context: IContext;
    params: IParams;
    unitName: string | undefined;
    valueFormat: string | undefined;
    dataType: number | undefined;
    hidden: boolean | undefined;
    /**
     * 编辑器控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @type {IEditorController}
     */
    editor?: IEditorController;
    /**
     * 编辑器适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     */
    editorProvider?: IEditorProvider;
    /**
     * 唯一标识，作为第一个下拉的时候的唯一判断，默认是fieldName
     * @author lxm
     * @date 2024-04-10 02:10:00
     * @type {string}
     */
    key: string;
    /**
     * 过滤的属性名称(有实体属性的是属性codeName小写，没有就是项名称)
     * @author lxm
     * @date 2023-10-13 02:51:39
     * @type {string}
     */
    fieldName: string;
    /**
     * 属性显示的标题
     * @author lxm
     * @date 2023-10-13 03:02:42
     * @type {string}
     */
    label: string;
    /**
     * 配置的属性搜索模式对应的值操作
     * @author lxm
     * @date 2023-10-13 03:22:10
     * @type {string}
     */
    valueOP?: string;
    /**
     * 不需要编辑器
     * @author lxm
     * @date 2024-01-02 11:08:45
     * @type {boolean}
     */
    noEditor: boolean;
    /**
     * 控制器类型
     * @author lxm
     * @date 2024-04-10 01:41:40
     * @type {('ITEMS' | 'SIMPLE_ITEMS' | 'FIELD')}
     */
    type: 'ITEMS' | 'SIMPLE_ITEMS' | 'FIELD';
    /**
     * 值项
     * @author lxm
     * @date 2024-02-04 06:25:42
     * @readonly
     * @type {(string | undefined)}
     */
    get valueItem(): string | undefined;
    constructor(model: ISearchBarFilter, appDataEntity: IAppDataEntity, context: IContext, params: IParams);
    /**
     * 初始化
     * @author lxm
     * @date 2023-10-12 05:47:19
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 计算要递给编辑器的参数
     * @author lxm
     * @date 2024-02-04 06:35:28
     * @param {IFilterNodeField} node
     * @return {*}  {{ value: unknown; data: IData }}
     */
    calcEditorProps(node: IFilterNodeField): {
        value: unknown;
        data: IData;
    };
    /**
     * 编辑器值变更处理
     * @author lxm
     * @date 2024-02-04 06:42:04
     * @param {IFilterNodeField} node
     * @param {unknown} value
     * @param {string} [name]
     */
    onEditorChange(node: IFilterNodeField, value: unknown, name?: string): void;
}
//# sourceMappingURL=search-bar-filter.controller.d.ts.map