import { IReportPanelController, IReportViewEvent, IReportViewState, ISearchBarController, ISearchFormController, ViewController, ViewEngineBase } from '@ibiz-template/runtime';
import { IAppDEReportView } from '@ibiz/model-core';
export declare class ReportViewEngine extends ViewEngineBase {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppDEReportView,
     *     IReportViewState,
     *     IReportViewEvent
     *   >}
     * @memberof EditViewEngine
     */
    protected view: ViewController<IAppDEReportView, IReportViewState, IReportViewEvent>;
    /**
     * 搜索表单控制器
     *
     * @readonly
     */
    protected get searchForm(): ISearchFormController;
    /**
     * 搜索栏控制器
     *
     * @readonly
     */
    protected get searchBar(): ISearchBarController;
    /**
     * 报表部件
     *
     * @readonly
     */
    get reportpanel(): IReportPanelController;
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof ReportViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 挂载
     *
     * @return {*}  {Promise<void>}
     * @memberof ReportViewEngine
     */
    onMounted(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
    /**
     * 获取数据
     *
     * @return {*}  {IData[]}
     * @memberof ReportViewEngine
     */
    getData(): IData[];
    /**
     * 加载数据
     *
     * @return {*}  {Promise<IData>}
     * @memberof ReportViewEngine
     */
    load(): Promise<IData>;
    /**
     * 视图重新加载
     *
     * @return {*}  {Promise<void>}
     */
    protected reLoad(): Promise<void>;
    /**
     * 刷新
     *
     * @return {*}  {Promise<void>}
     * @memberof ReportViewEngine
     */
    refresh(): Promise<void>;
    /**
     * 获取搜索相关的查询参数
     *
     * @return {*}  {IParams}
     */
    protected getSearchParams(): IParams;
    /**
     *计算视图头部实现是否显示
     *
     * @protected
     * @return {*}  {boolean}
     * @memberof ReportViewEngine
     */
    protected calcViewHeaderVisible(): boolean;
    /**
     * 计算搜索栏显示
     *
     * @author zk
     * @date 2024-01-29 05:01:36
     * @protected
     * @return {*}  {boolean}
     * @memberof MDViewEngine
     */
    protected calcViewSearchBarVisible(): boolean;
    /**
     * 计算移除的模型名称
     *
     * @author zk
     * @date 2024-01-29 03:01:42
     * @return {*}  {string[]}
     * @memberof MDViewEngine
     */
    calcRemoveLayoutModel(): string[];
    /**
     * 切换搜索表单的显示与否
     *
     * @protected
     */
    protected toggleFilter(): void;
}
