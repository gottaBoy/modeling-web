import { IModalData, IOpenViewOptions, IViewConfig } from '../../../interface';
/**
 * 打开应用视图
 *
 * @author chitanda
 * @date 2022-07-25 18:07:20
 * @export
 * @class OpenAppViewCommand
 */
export declare class OpenAppViewCommand {
    static readonly TAG = "ibiz.app-view.open";
    constructor();
    /**
     * xhr模式打开
     *
     * @author chitanda
     * @date 2022-08-25 23:08:08
     * @param {string} appViewId
     * @param {IContext} [context]
     * @param {IParams} [params={}]
     * @param {IData} [_opts={}]
     * @return {*}  {(Promise<IModalData | void>)}
     */
    exec(appViewId: string, _context: IContext, params?: IParams, opts?: IOpenViewOptions): Promise<IModalData | void>;
    /**
     * 首页导航模式打开
     *
     * @author chitanda
     * @date 2022-07-25 20:07:43
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} [context]
     * @param {IParams} [params={}]
     */
    protected openIndexViewTab(appView: IViewConfig, context: IContext, params?: IParams, modalOptions?: IData): Promise<IModalData>;
    /**
     * 模态路由打开视图，路由拼接于当前视图路由后。再由特殊解析呈现
     *
     * @author chitanda
     * @date 2024-01-23 11:01:07
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IModalData>}
     */
    protected openIndexViewTabByModal(appView: IViewConfig, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 模态窗口打开
     *
     * @author tony001
     * @date 2025-03-24 17:03:01
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @param {IOpenViewOptions} [opts={}]
     * @return {*}  {Promise<IModalData>}
     */
    protected openModal(appView: IViewConfig, context: IContext, params?: IParams, opts?: IOpenViewOptions): Promise<IModalData>;
    /**
     * 气泡模式打开
     *
     * @author tony001
     * @date 2025-03-24 17:03:14
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @param {IOpenViewOptions} [opts={}]
     * @return {*}  {Promise<IModalData>}
     */
    protected openPopover(appView: IViewConfig, context: IContext, params?: IParams, opts?: IOpenViewOptions): Promise<IModalData>;
    /**
     * 抽屉模式打开
     *
     * @author tony001
     * @date 2025-03-24 17:03:25
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @param {IOpenViewOptions} [opts={}]
     * @return {*}  {Promise<IModalData>}
     */
    protected openDrawer(appView: IViewConfig, context: IContext, params?: IParams, opts?: IOpenViewOptions): Promise<IModalData>;
    /**
     * 用户自定义
     *
     * @author chitanda
     * @date 2022-07-25 20:07:41
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} [context]
     * @param {IParams} [params={}]
     * @return {*}  {Promise<void>}
     */
    protected openUserCustom(appView: IViewConfig, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 独立程序弹出
     *
     * @author zzq
     * @date 2024-07-19 20:07:55
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} [context]
     * @param {IParams} [params={}]
     * @return {*}  {Promise<void>}
     */
    protected openPopupApp(appView: IViewConfig, context: IContext, params?: IParams): Promise<void>;
}
//# sourceMappingURL=open-app-view.d.ts.map