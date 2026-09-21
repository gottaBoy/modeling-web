import { EditorController, SearchBarFilterController } from '@ibiz-template/runtime';
import { IAppDataEntity, IPicker, ISearchBarFilter } from '@ibiz/model-core';
/**
 * 搜索过滤项编辑器控制器
 *
 * @author lxm
 * @date 2022-08-24 20:08:25
 * @export
 * @class SearchCondEditEditorController
 * @extends {EditorController}
 */
export declare class SearchCondEditEditorController extends EditorController<IPicker> {
    protected onInit(): Promise<void>;
    /**
     * 过滤项集合
     *
     */
    searchBarFilters: ISearchBarFilter[];
    /**
     * 过滤项控制器集合
     *
     */
    filterControllers: SearchBarFilterController[];
    /**
     * 实体模型
     * @author lxm
     * @date 2023-10-13 02:49:59
     * @type {IAppDataEntity}
     */
    appDataEntity: IAppDataEntity | null;
    /**
     * 根据实体jsonschema初始化
     * @author lxm
     * @date 2023-12-29 04:21:31
     * @return {*}  {Promise<void>}
     */
    initByEntitySchema(): Promise<void>;
    /**
     * 初始化过滤项控制器
     * @author lxm
     * @date 2023-10-13 03:33:17
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initSearchBarFilters(): Promise<void>;
}
