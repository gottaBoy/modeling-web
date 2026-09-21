import { ISearchBarController, ISearchFormController, ITabExpPanelController, ITabSearchViewEvent, ITabSearchViewState, ViewController } from '@ibiz-template/runtime';
import { IAppDETabSearchView, IDETabViewPanel } from '@ibiz/model-core';
import { TabExpViewEngine } from './tab-exp-view.engine';
/**
 * 编辑视图3（分页关系）
 *
 * @export
 * @class TabSearchViewEngine
 * @extends {EditViewEngine}
 */
export declare class TabSearchViewEngine extends TabExpViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppDETabSearchView,
     *     ITabSearchViewState,
     *     ITabSearchViewEvent
     *   >}
     * @memberof TabSearchViewEngine
     */
    protected view: ViewController<IAppDETabSearchView, ITabSearchViewState, ITabSearchViewEvent>;
    /**
     * 搜索表单控制器
     * @author lxm
     * @date 2023-05-22 01:56:25
     * @readonly
     */
    protected get searchForm(): ISearchFormController;
    /**
     * 搜索栏控制器
     * @author lxm
     * @date 2023-05-22 01:56:25
     * @readonly
     */
    protected get searchBar(): ISearchBarController;
    /**
     * 分页导航面板控制器
     * @author lxm
     * @date 2023-05-22 01:56:25
     * @readonly
     */
    get tabExpPanel(): ITabExpPanelController;
    protected preprocessTabExpModelLayout(): void;
    onCreated(): Promise<void>;
    onMounted(): Promise<void>;
    /**
     * 给快捷搜索赋默认提示值
     * @author ljx
     * @date 2024-11-12 10:56:25
     * @return {*}  {Promise<void>}
     * @memberof TabSearchViewEngine
     */
    onQuickSearchPlaceHolder(tab: IDETabViewPanel): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
    /**
     * 获取搜索相关的查询参数
     * @author lxm
     * @date 2023-05-22 03:26:04
     * @return {*}  {IParams}
     */
    protected getSearchParams(): IParams;
    /**
     * 计算视图头部元素的显示与否
     * 所有部件容器名称均为：view_部件名称
     * - 注意 分页导航和分页搜索的默认布局不一致
     *
     *   分页导航：分页导航栏在视图头中
     *
     *   分页搜索：分页导航栏不在视图头中
     * @protected
     */
    protected calcViewHeaderVisible(): boolean;
    /**
     * 重新计算视图参数
     * @author lxm
     * @date 2024-03-18 05:00:02
     */
    calcViewParams(): void;
}
