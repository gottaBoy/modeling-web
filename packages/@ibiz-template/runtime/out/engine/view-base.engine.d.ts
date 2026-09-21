import { IPortalMessage } from '@ibiz-template/core';
import { IViewController, IToolbarController, IViewLayoutPanelController, ISearchFormController, ISearchBarController } from '../interface';
import { IViewEngine } from '../interface/engine';
/**
 * 视图引擎基类
 * @author lxm
 * @date 2023-04-26 07:29:27
 * @export
 * @class ViewEngineBase
 */
export declare class ViewEngineBase implements IViewEngine {
    protected view: IViewController;
    /**
     * 获取工具栏控制器
     * @author lxm
     * @date 2023-05-22 03:47:43
     * @readonly
     * @protected
     * @type {(IToolbarController | undefined)}
     */
    protected get toolbar(): IToolbarController | undefined;
    /**
     * 左工具栏
     * @author lxm
     * @date 2023-06-20 02:36:45
     * @readonly
     * @protected
     * @type {(IToolbarController | undefined)}
     */
    protected get leftToolbar(): IToolbarController | undefined;
    /**
     * 右工具栏
     * @author lxm
     * @date 2023-06-20 02:36:45
     * @readonly
     * @protected
     * @type {(IToolbarController | undefined)}
     */
    protected get rightToolbar(): IToolbarController | undefined;
    /**
     * 右工具栏
     * @author lxm
     * @date 2023-06-20 02:36:45
     * @readonly
     * @protected
     * @type {(IToolbarController | undefined)}
     */
    protected get footerToolbar(): IToolbarController | undefined;
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
     * 获取分页搜索视图上移的搜索表单控制器
     * @author lxm
     * @date 2023-05-22 01:56:25
     * @readonly
     */
    protected get tabSearchForm(): ISearchFormController;
    /**
     * 获取视图布局面板控制器
     * @author lxm
     * @date 2023-05-22 03:47:43
     * @readonly
     * @protected
     * @type {(IToolbarController | undefined)}
     */
    protected get viewLayoutPanel(): IViewLayoutPanelController | undefined;
    /**
     *是否允许请求数据权限
     *
     * @protected
     * @type {boolean}
     * @memberof ViewEngineBase
     */
    protected enabledDataAccAction: boolean;
    /**
     * 构造函数在视图控制器的构造函数逻辑内部执行
     * @author lxm
     * @date 2023-05-06 08:18:28
     * @param {IViewController} view 视图控制器
     */
    constructor(view: IViewController);
    /**
     * 引擎内部初始化
     *
     * @author chitanda
     * @date 2024-02-05 22:02:12
     * @protected
     */
    protected init(): void;
    /**
     * 重新计算上下文，主要用于视图控制器再算上下文后，每个视图控制器可自身根据变动重新计算
     * @author zpc
     * @date 2024-03-12 13:50:07
     * @return {*}  {Promise<void>}
     */
    handleContextParams(): void;
    onCreated(): Promise<void>;
    /**
     * 计算动态布局模型
     *
     * @author zk
     * @date 2024-01-29 02:01:47
     * @memberof ViewEngineBase
     */
    protected calcDynamicLayout(): void;
    /**
     * 计算移除的模型名称
     *
     * @author zk
     * @date 2024-01-29 02:01:21
     * @return {*}  {string[]}
     * @memberof ViewEngineBase
     */
    protected calcRemoveLayoutModel(): string[];
    /**
     * 删除布局模型
     *
     * @author zk
     * @date 2024-01-29 02:01:29
     * @param {string[]} names
     * @param {(IPanelContainer | undefined)} [container=this.view.model.viewLayoutPanel]
     * @return {*}  {void}
     * @memberof ViewEngineBase
     */
    private removeLayoutModel;
    onMounted(): Promise<void>;
    onDestroyed(): Promise<void>;
    call(key: string, _args?: IData): Promise<IData | null | undefined>;
    /**
     * 拷贝路径
     *
     * @protected
     * @return {*}  {IData}
     * @memberof ViewEngineBase
     */
    protected onCopyPath(): IData;
    /**
     * 快捷方式
     *
     * @param {*} args
     * @return {*}  {(Promise<any>)}
     * @memberof ViewEngineBase
     */
    onShortCut(args: any): Promise<any>;
    /**
     * 初始化视图state
     * @author lxm
     * @date 2023-05-15 06:42:25
     * @protected
     */
    protected initViewState(): void;
    /**
     * 获取视图数据部件的数据
     * @author lxm
     * @date 2023-05-08 12:46:19
     * @return {*}  {IData[]}
     */
    protected getData(): IData[];
    /**
     * 计算视图头部元素的显示与否
     * 所有部件容器名称均为：view_部件名称
     *
     * @author lxm
     * @date 2023-06-06 07:16:26
     * @protected
     */
    protected calcViewHeaderVisible(): boolean;
    /**
     * 是否存在模型 并且 布局中有占位
     * - 工具栏模型还需判断是否有工具栏项
     * @author zk
     * @date 2024-01-30 11:01:33
     * @param {string} name
     * @return {*}  {(IData | undefined)}
     * @memberof ViewEngineBase
     */
    isExistAndInLayout(name: string): boolean;
    /**
     * 计算底部的显示与否
     * @author lxm
     * @date 2023-06-20 02:45:17
     * @protected
     * @return {*}  {boolean}
     */
    protected calcViewFooterVisible(): boolean;
    /**
     * 监听实体数据变更
     *
     * @author zzq
     * @date 2024-10-29 18:03:33
     * @protected
     * @param {IPortalMessage} msg
     */
    protected onDEDataChange(msg: IPortalMessage): void;
    /**
     * 加载实体数据
     *
     * @return {*}  {(Promise<void>)}
     * @memberof ViewEngineBase
     */
    loadEntityData(): Promise<void>;
    /**
     * 计算工具栏状态
     *
     * @protected
     * @param {IData} [data]
     * @param {string} [appDeId]
     * @memberof ViewEngineBase
     */
    protected calcToolbarState(data?: IData, appDeId?: string): void;
    /**
     * 处理实体权限
     * @author zzq
     * @date 2024-06-03 15:59:08
     * @return {*}  {Promise<void>}
     */
    protected handleEntityPrivilege(data: IData, context: IContext): Promise<void>;
    /**
     * 切换搜索表单的显示与否
     * @author lxm
     * @date 2023-06-06 09:20:35
     * @protected
     */
    protected toggleFilter(): void;
}
//# sourceMappingURL=view-base.engine.d.ts.map