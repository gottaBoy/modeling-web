import { IModalData, IPopoverOptions } from '../../common';
/**
 * 打开视图工具类
 *
 * @description 各种类型打开视图方法实现接口定义
 * @author chitanda
 * @date 2022-08-16 20:08:38
 * @export
 * @interface IOpenViewUtil
 */
export interface IOpenViewUtil {
    /**
     * 直接路径打开视图
     *
     * @author chitanda
     * @date 2023-08-18 11:08:33
     * @param {string} path
     * @return {*}  {Promise<IModalData>}
     */
    push(path: string): Promise<IModalData>;
    /**
     * 打开顶级视图(一般为路由打开)
     *
     * @author chitanda
     * @date 2023-07-12 21:07:51
     * @param {string} appViewId
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IModalData>}
     */
    root(appViewId: string, context: IContext, params?: IParams, modalOptions?: IData): Promise<IModalData>;
    /**
     * 打开顶级视图(包含路由跳转后使用模态打开视图)
     *
     * @author chitanda
     * @date 2024-01-23 11:01:32
     * @param {string} appViewId
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IModalData>}
     */
    rootByModal(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 打开模态视图
     *
     * @author chitanda
     * @date 2022-08-16 20:08:41
     * @param {string} appViewId
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<IModalData>}
     */
    modal(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 气泡模式打开
     *
     * @author chitanda
     * @date 2022-08-16 20:08:22
     * @param {string} appViewId
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<IModalData>}
     */
    popover(appViewId: string, event: MouseEvent, context: IContext, params?: IParams, options?: IPopoverOptions): Promise<IModalData>;
    /**
     * 抽屉模式打开
     *
     * @author chitanda
     * @date 2022-08-16 20:08:46
     * @param {string} appViewId
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<IModalData>}
     */
    drawer(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 自定义打开方式
     *
     * @author chitanda
     * @date 2022-08-16 20:08:29
     * @param {string} appViewId
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<IModalData>}
     */
    custom(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 独立程序打开
     *
     * @author zzq
     * @date 2024-07-19 20:08:29
     * @param {string} appViewId
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<void>}
     */
    popupApp(appViewId: string, context: IContext, params?: IParams): Promise<void>;
}
//# sourceMappingURL=i-open-view-util.d.ts.map