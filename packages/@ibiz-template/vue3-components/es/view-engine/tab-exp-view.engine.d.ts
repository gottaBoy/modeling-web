import { ViewEngineBase, ViewController, ITabExpPanelController, ITabExpViewEvent, ITabExpViewState } from '@ibiz-template/runtime';
import { IAppDETabExplorerView } from '@ibiz/model-core';
export declare class TabExpViewEngine extends ViewEngineBase {
    /**
     * 分页面板视图控制器
     *
     * @protected
     * @type {ViewController<
     *         IAppDETabExplorerView,
     *         ITabExpViewState,
     *         ITabExpViewEvent
     *     >}
     * @memberof TabExpViewEngine
     */
    protected view: ViewController<IAppDETabExplorerView, ITabExpViewState, ITabExpViewEvent>;
    /**
     * 分页导航面板
     *
     * @readonly
     * @memberof TabExpViewEngine
     */
    get tabExpPanel(): ITabExpPanelController;
    /**
     * 视图created生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof TabExpViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 分页导航视图刷新
     *
     * @author tony001
     * @date 2024-10-21 11:10:47
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    call(key: string, args: any): Promise<any>;
    onMounted(): Promise<void>;
    loadEntityData(): Promise<void>;
    /**
     * 根据视图模型配置方向决定分页面板部件位置方向
     *
     * @author zk
     * @date 2023-09-20 05:09:37
     * @protected
     * @memberof TabExpViewEngine
     */
    protected preprocessTabExpModelLayout(): void;
    /**
     * 计算视图头部元素的显示与否
     * 所有部件容器名称均为：view_部件名称
     *
     * @author lxm
     * @date 2023-06-06 07:16:26
     * @protected
     */
    protected calcViewHeaderVisible(): boolean;
}
