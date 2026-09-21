import { ModelError, RuntimeError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { calcDeCodeNameById } from '../../../model';
import { openRedirectView } from '../../../utils';
import { Srfuf } from '../../../service';
/**
 * 打开应用视图
 *
 * @author chitanda
 * @date 2022-07-25 18:07:20
 * @export
 * @class OpenAppViewCommand
 */
export class OpenAppViewCommand {
    constructor() {
        ibiz.commands.register(OpenAppViewCommand.TAG, this.exec.bind(this));
    }
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
    async exec(appViewId, _context, params = {}, opts = {}) {
        const context = clone(_context);
        if (context.srfsimple) {
            delete context.srfsimple;
        }
        const appView = await ibiz.hub.config.view.get(appViewId);
        if (!appView) {
            throw new RuntimeError(ibiz.i18n.t('runtime.command.app.noFindApplicationView', {
                appViewId,
            }));
        }
        if ((context.srfkey || params.srfuf === Srfuf.CREATE) &&
            appView.appDataEntityId) {
            const deName = calcDeCodeNameById(appView.appDataEntityId);
            // 识别上下文的srfkey并转成对应视图实体名称，然后置空srfkey
            if (context.srfkey) {
                context[deName] = context.srfkey;
                context.srfkey = undefined;
            }
            // 识别参数的 srfuf=0 时为新建。置空和当前要打开视图同实体的主键，避免同上下文导致后一个页面识别为了编辑。然后置空srfuf
            if (params.srfuf === Srfuf.CREATE) {
                context[deName] = undefined;
                delete params.srfuf;
            }
        }
        if (appView.redirectView) {
            const fullViewModel = await ibiz.hub.getAppView(appViewId);
            return openRedirectView(fullViewModel, context, params, opts);
        }
        const { openMode = 'INDEXVIEWTAB' } = appView;
        const viewOpenMode = opts.openMode || openMode;
        if (viewOpenMode !== undefined && viewOpenMode !== 'INDEXVIEWTAB') {
            // 除了走路由的，其他情况toRouteDepth转为undefined，避免影响后续操作
            if (context.toRouteDepth) {
                context.toRouteDepth = undefined;
            }
        }
        switch (viewOpenMode) {
            case 'INDEXVIEWTAB':
            case 'INDEXVIEWTAB_POPUP':
                if (opts.noWaitRoute) {
                    this.openIndexViewTab(appView, context, params, opts);
                    return { ok: true };
                }
                return this.openIndexViewTab(appView, context, params, opts);
            case 'INDEXVIEWTAB_POPUPMODAL':
                return this.openIndexViewTabByModal(appView, context, params);
            case 'POPUP':
                throw new ModelError(appView, ibiz.i18n.t('runtime.command.app.unsupportedPopup'));
            case 'POPUPMODAL':
                return this.openModal(appView, context, params);
            case 'POPUPAPP':
                return this.openPopupApp(appView, context, params);
            case 'POPOVER':
                return this.openPopover(appView, context, params, opts);
            case 'DRAWER_LEFT':
            case 'DRAWER_RIGHT':
            case 'DRAWER_TOP':
            case 'DRAWER_BOTTOM':
                return this.openDrawer(appView, context, params);
            case 'USER':
                return this.openUserCustom(appView, context, params);
            default:
                return this.openIndexViewTab(appView, context, params, opts);
        }
    }
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
    openIndexViewTab(appView, context, params = {}, modalOptions = {}) {
        const { modalOption } = modalOptions;
        return ibiz.openView.root(appView.id, context, params, Object.assign({}, modalOption));
    }
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
    openIndexViewTabByModal(appView, context, params = {}) {
        return ibiz.openView.rootByModal(appView.id, context, params);
    }
    /**
     * 模态窗口打开
     *
     * @author chitanda
     * @date 2022-07-25 20:07:55
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} [context]
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IModalData>}
     */
    async openModal(appView, context, params = {}) {
        return ibiz.openView.modal(appView.id, context, params);
    }
    /**
     * 气泡模式打开
     *
     * @author chitanda
     * @date 2022-07-25 20:07:17
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} [context]
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IModalData>}
     */
    async openPopover(appView, context, params = {}, opts = {}) {
        const { event, modalOption } = opts;
        if (!event) {
            throw new RuntimeError(ibiz.i18n.t('runtime.command.app.missingEvent'));
        }
        return ibiz.openView.popover(appView.id, event, context, params, Object.assign({}, modalOption));
    }
    /**
     * 抽屉模式打开
     *
     * @author chitanda
     * @date 2022-07-25 20:07:08
     * @protected
     * @param {IViewConfig} appView
     * @param {IContext} [context]
     * @param {IParams} [params={}]
     * @return {*}  {Promise<void>}
     */
    async openDrawer(appView, context, params = {}) {
        return ibiz.openView.drawer(appView.id, context, params);
    }
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
    async openUserCustom(appView, context, params = {}) {
        return ibiz.openView.custom(appView.id, context, params);
    }
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
    async openPopupApp(appView, context, params = {}) {
        return ibiz.openView.popupApp(appView.id, context, params);
    }
}
OpenAppViewCommand.TAG = 'ibiz.app-view.open';
