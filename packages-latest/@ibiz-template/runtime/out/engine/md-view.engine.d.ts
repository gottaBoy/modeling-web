import { IAppDEMultiDataView } from '@ibiz/model-core';
import { ViewController } from '../controller';
import { IMDViewEvent, IMDViewState, IMDControlController, MDCtrlRemoveParams, ISearchBarController, MDCtrlLoadParams, EventBase, IUIActionResult, IToolbarController, IApiMDViewCall } from '../interface';
import { ViewEngineBase } from './view-base.engine';
/**
 * 多数据视图引擎
 * @author lxm
 * @date 2023-05-22 03:12:29
 * @export
 * @class MDViewEngine
 * @extends {ViewEngineBase}
 */
export declare class MDViewEngine extends ViewEngineBase {
    protected view: ViewController<IAppDEMultiDataView, IMDViewState, IMDViewEvent>;
    /**
     * 多数据部件名称
     * @author lxm
     * @date 2023-06-07 09:17:19
     * @readonly
     * @type {string}
     */
    get xdataControlName(): string;
    /**
     * 获取分页搜索视图上移的工具栏控制器
     * @author lxm
     * @date 2023-05-22 03:47:43
     * @readonly
     * @protected
     * @type {(IToolbarController | undefined)}
     */
    protected get tabToolbar(): IToolbarController | undefined;
    /**
     * 获取分页搜索视图上移的搜索栏控制器
     * @author lxm
     * @date 2023-05-22 01:56:25
     * @readonly
     */
    protected get tabSearchBar(): ISearchBarController;
    /**
     * 数据部件控制器（多数据）
     * @author lxm
     * @date 2023-05-22 01:56:35
     * @readonly
     * @type {IMDControlController}
     */
    protected get xdataControl(): IMDControlController;
    onCreated(): Promise<void>;
    onMounted(): Promise<void>;
    /**
     * 重新计算上下文，主要用于视图控制器再算上下文后，每个视图控制器可自身根据变动重新计算
     * @author zpc
     * @date 2024-03-12 13:52:06
     * @return {*}  {Promise<void>}
     */
    handleContextParams(): void;
    /**
     * 多数据部件激活事件处理
     * @author lxm
     * @date 2023-08-31 02:53:37
     * @protected
     * @param {EventBase} event
     * @return {*}  {Promise<void>}
     */
    protected onXDataActive(event: EventBase): Promise<void>;
    call(key: keyof IApiMDViewCall, args: any): Promise<IData | null | undefined>;
    protected getData(): IData[];
    /**
     * 打开编辑数据视图
     *
     * @author lxm
     * @date 2022-09-01 18:09:19
     * @param {IData} data
     * @param {MouseEvent} [event]
     * @returns {*}
     */
    protected openData(args: {
        data: IData[];
        event?: MouseEvent;
        context?: IContext;
        params?: IParams;
    }): Promise<IUIActionResult>;
    /**
     * 打开新建数据视图
     *
     * @author lxm
     * @date 2022-09-01 18:09:19
     * @param {IData} data
     * @param {MouseEvent} [event]
     * @returns {*}
     */
    protected newData(args: {
        data: IData[];
        event?: MouseEvent;
        copyMode?: boolean;
        params?: IParams;
    }): Promise<IUIActionResult>;
    /**
     * 视图删除
     *
     * @author lxm
     * @date 2022-08-30 19:08:59
     * @returns {*}  {Promise<void>}
     */
    protected remove(args?: MDCtrlRemoveParams | undefined): Promise<void>;
    /**
     * 视图加载
     * @author lxm
     * @date 2023-05-22 03:17:33
     * @return {*}  {Promise<void>}
     */
    protected load(args?: MDCtrlLoadParams): Promise<void>;
    /**
     * 视图刷新
     * @author lxm
     * @date 2023-05-22 03:17:33
     * @return {*}  {Promise<void>}
     */
    protected refresh(): Promise<void>;
    /**
     * 视图重新加载
     * @author lxm
     * @date 2023-05-22 03:17:33
     * @return {*}  {Promise<void>}
     */
    protected reLoad(): Promise<void>;
    /**
     * @description 设置选中数据
     * @protected
     * @param {IData[]} items
     * @memberof MDViewEngine
     */
    protected setSelectedData(items: IData[]): void;
    /**
     * 获取搜索相关的查询参数
     * @author lxm
     * @date 2023-05-22 03:26:04
     * @return {*}  {IParams}
     */
    protected getSearchParams(): IParams;
    /**
     * @description 处理搜索参数
     * @protected
     * @param {IParams} params
     * @param {IParams} newParams
     * @returns {*}  {IParams}
     * @memberof MDViewEngine
     */
    protected handleSearchParams(params: IParams, newParams: IParams): IParams;
    /**
     * 导入数据
     * @author lxm
     * @date 2023-05-22 03:28:26
     * @return {*}  {Promise<void>}
     */
    protected importData(): Promise<void>;
    /**
     * 导出数据
     * @author lxm
     * @date 2023-05-22 03:29:06
     * @param {{ event: MouseEvent }} args
     * @return {*}  {Promise<void>}
     */
    protected exportData(args: {
        event: MouseEvent;
    }): Promise<void>;
    /**
     * 复制数据
     *
     * @author zk
     * @date 2023-06-01 12:06:58
     * @memberof MDViewEngine
     */
    copy(args: {
        data: IData[];
        event?: MouseEvent;
    }): Promise<void>;
    /**
     * 计算头部显示
     *
     * @author zk
     * @date 2024-01-29 05:01:30
     * @protected
     * @return {*}  {boolean}
     * @memberof MDViewEngine
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
}
//# sourceMappingURL=md-view.engine.d.ts.map