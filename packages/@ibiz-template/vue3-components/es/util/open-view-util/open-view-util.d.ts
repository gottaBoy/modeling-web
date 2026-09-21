import { IModalData, IOpenViewUtil, IPopoverOptions } from '@ibiz-template/runtime';
import { Router } from 'vue-router';
import { FloatingUIConfig } from '../app-popover/app-popover-component';
/**
 * 打开视图方式工具类
 *
 * @description 此实现类挂载在 ibiz.openViewUtil
 * @author chitanda
 * @date 2022-08-16 20:08:54
 * @export
 * @class OpenViewUtil
 * @implements {IOpenViewUtil}
 */
export declare class OpenViewUtil implements IOpenViewUtil {
    protected router: Router;
    constructor(router: Router);
    push(path: string): Promise<IModalData>;
    root(appViewId: string, context: IContext, params?: IParams, modalOptions?: IData): Promise<IModalData>;
    rootByModal(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 模态打开视图
     *
     * @author lxm
     * @date 2022-09-12 01:09:06
     * @param {string} appViewId
     * @param {(IContext)} [context]
     * @param {(IParams)} [params]
     * @returns {*}  {Promise<IModalData>}
     */
    modal(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    popover(appViewId: string, event: MouseEvent, context: IContext, params?: IParams, options?: IPopoverOptions<FloatingUIConfig>): Promise<IModalData>;
    /**
     * 抽屉打开视图
     *
     * @author lxm
     * @date 2022-09-15 15:09:50
     * @param {string} appViewId
     * @param {(IContext)} [context]
     * @param {(IParams)} [params]
     * @returns {*}  {Promise<IModalData>}
     */
    drawer(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    custom(appViewId: string, context: IContext, params?: IParams): Promise<IModalData>;
    /**
     * 抽屉打开视图
     *
     * @author lxm
     * @date 2022-09-15 15:09:50
     * @param {string} appViewId
     * @param {(IContext)} [context]
     * @param {(IParams)} [params]
     * @returns {*}  {Promise<IModalData>}
     */
    popupApp(appViewId: string, context: IContext, params?: IParams): Promise<void>;
}
