/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModelError, RuntimeError } from '@ibiz-template/core';
import { convertNavData, ScriptFactory } from '../../../utils';
import { OpenAppViewCommand } from '../open-app-view/open-app-view';
import { UIActionUtil } from '../../../ui-action';
/**
 * 执行应用功能
 *
 * @author chitanda
 * @date 2022-07-25 11:07:07
 * @export
 * @class AppFuncCommand
 */
export class AppFuncCommand {
    constructor() {
        ibiz.commands.register(AppFuncCommand.TAG, this.exec.bind(this));
    }
    /**
     * 执行应用功能
     *
     * @author chitanda
     * @date 2022-07-25 17:07:35
     * @param {IAppFunc} appFunc 应用功能模型
     * @param {IContext} [context] 执行上下文
     * @param {IParams} [params={}] 参数
     * @param {IData} [opts={}] 额外参数，与具体执行对象规划好的额外参数。如需要给飘窗使用的 event 事件对象.
     * @return {*}  {Promise<void>}
     */
    async exec(appFuncId, context, params = {}, opts = {}) {
        const app = await ibiz.hub.getAppAsync(context.srfappid);
        const appFunc = app.getAppFunc(appFuncId);
        if (!appFunc) {
            throw new RuntimeError(ibiz.i18n.t('runtime.command.app.noFindApplicationFunction', {
                appFuncId,
            }));
        }
        // 导航参数转换
        const { navigateContexts, navigateParams, appFuncType } = appFunc;
        const _context = context.clone();
        Object.assign(_context, convertNavData(navigateContexts, params, context));
        const _params = convertNavData(navigateParams, params, context);
        Object.assign(_params, params);
        switch (appFuncType) {
            case 'APPVIEW':
                return this.openAppView(appFunc, _context, _params, opts);
            case 'OPENHTMLPAGE':
                return this.openHtmlPage(appFunc);
            case 'PDTAPPFUNC':
                return this.openPdAppFunc(appFunc, _context, _params);
            case 'JAVASCRIPT':
                return this.executeJavaScript(appFunc, _context, _params);
            case 'CUSTOM':
                return this.custom(appFunc, _context, _params);
            case 'UIACTION':
                return this.executeUIAction(appFunc, _context, _params, opts);
            default:
                throw new ModelError(appFunc, ibiz.i18n.t('runtime.command.app.noFindApplicationFunctionYype', {
                    appFuncType,
                }));
        }
    }
    /**
     * 打开应用视图
     *
     * @author chitanda
     * @date 2022-07-25 18:07:49
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<void>}
     */
    async openAppView(appFunc, context, params, opts) {
        if (!appFunc.appViewId) {
            throw new RuntimeError(ibiz.i18n.t('runtime.command.app.noFindApplicationView', {
                appViewId: appFunc.appViewId,
            }));
        }
        return ibiz.commands.execute(OpenAppViewCommand.TAG, appFunc.appViewId, context, params, opts);
    }
    /**
     * 打开HTML页面
     *
     * @author chitanda
     * @date 2022-07-25 18:07:56
     * @protected
     * @param {IAppFunc} appFunc
     */
    openHtmlPage(appFunc) {
        const url = appFunc.htmlPageUrl;
        window.open(url, '_blank');
    }
    /**
     * 应用预置功能
     *
     * @author chitanda
     * @date 2022-07-25 18:07:22
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    openPdAppFunc(appFunc, context, params) {
        ibiz.log.warn('openPdAppFunc', appFunc, context, params);
        throw new RuntimeError(ibiz.i18n.t('runtime.common.unrealized'));
    }
    /**
     * 执行 JavaScript 脚本
     *
     * @author chitanda
     * @date 2022-07-25 18:07:09
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    executeJavaScript(appFunc, context, params) {
        ScriptFactory.execScriptFn({ context, params, data: {}, el: null, view: null }, appFunc.jscode);
    }
    /**
     * 执行界面行为
     *
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @memberof AppFuncCommand
     */
    async executeUIAction(appFunc, context, params, opts) {
        await UIActionUtil.exec(appFunc.uiactionId, {
            params,
            context,
            data: [],
            view: opts === null || opts === void 0 ? void 0 : opts.view,
            noWaitRoute: true,
        }, appFunc.appId);
    }
    /**
     * 自定义应用功能
     *
     * @author chitanda
     * @date 2022-07-25 18:07:51
     * @protected
     * @param {IAppFunc} appFunc
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    custom(appFunc, context, params) {
        ibiz.log.warn('custom', appFunc, context, params);
        throw new RuntimeError(ibiz.i18n.t('runtime.common.unrealized'));
    }
}
/**
 * 指令标识
 *
 * @author chitanda
 * @date 2022-07-25 17:07:20
 * @see 具体实现 {@link AppFuncCommand.exec}
 * @static
 */
AppFuncCommand.TAG = 'ibiz.app-func.exec';
