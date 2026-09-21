import { RuntimeError } from '@ibiz-template/core';
import { PresetIdentifier, SysUIActionTag, ViewCallTag } from '../constant';
import { getUIActionById } from '../model';
import { getUIActionProvider } from '../register';
/**
 * 界面行为工具类
 *
 * @author chitanda
 * @date 2022-08-26 00:08:17
 * @export
 * @class AppDEUIActionUtil
 */
export class UIActionUtil {
    /**
     * 执行界面行为
     *
     * @author lxm
     * @date 2023-05-15 07:54:53
     * @static
     * @param {string} actionId 界面行为id
     * @param {IUILogicParams} params 界面行为参数
     * @return {*}  {Promise<IUIActionResult>}
     */
    static async exec(actionId, params, appId) {
        const action = await getUIActionById(actionId, appId);
        if (!action) {
            throw new RuntimeError(ibiz.i18n.t('runtime.uiAction.noFoundBehaviorModel', { actionId }));
        }
        // 单项数据的界面行为执行前校验表单的数据，不通过则拦截
        if (action.actionTarget === 'SINGLEDATA') {
            const validateResult = await params.view.call(ViewCallTag.VALIDATE);
            if (validateResult === false) {
                return { cancel: true };
            }
        }
        const provider = await getUIActionProvider(action);
        return provider.exec(action, params);
    }
    /**
     * 执行界面行为并处理返回值
     * @author lxm
     * @date 2023-05-15 07:54:36
     * @static
     * @param {string} actionId 界面行为id
     * @param {IUILogicParams} params 界面行为参数
     */
    static async execAndResolved(actionId, params, appId) {
        var _a, _b;
        const result = await this.exec(actionId, params, appId);
        if (result.closeView) {
            // 修复编辑器失焦后，调整数据后直接点击关闭按钮导致无法触发自动保存
            // params.view.modal.ignoreDismissCheck = true;
            params.view.closeView({ ok: true });
        }
        else if (result.refresh) {
            switch (result.refreshMode) {
                case 1:
                    params.view.callUIAction(SysUIActionTag.REFRESH);
                    break;
                case 2:
                    (_a = params.view.parentView) === null || _a === void 0 ? void 0 : _a.callUIAction(SysUIActionTag.REFRESH);
                    break;
                case 3:
                    (_b = params.view.getTopView()) === null || _b === void 0 ? void 0 : _b.callUIAction(SysUIActionTag.REFRESH);
                    break;
                default:
            }
        }
        const action = await getUIActionById(actionId, appId);
        // 异步行为模型配置方式:
        // 1、配置实体行为 返回值类型选择为 异步操作对象
        // 2、配置界面行为 界面行为类型选择 后台调用 、配置实体行为
        // 界面行为模型基于选择的实体行为的返回值类型计算异步行为（asyncAction）模型
        if (action.asyncAction && !result.cancel) {
            this.handleAsyncAction(params.event);
        }
    }
    /**
     * 处理异步行为
     *
     * @author zk
     * @date 2024-01-23 11:01:58
     * @static
     * @param {(Event | undefined)} event
     * @return {*}  {Promise<void>}
     * @memberof UIActionUtil
     */
    static async handleAsyncAction(event) {
        this.handleAsyncActionAnime(event);
    }
    /**
     * 处理异步行为动画
     *
     * @author zk
     * @date 2024-01-24 04:01:29
     * @private
     * @static
     * @param {(Event | undefined)} event
     * @return {*}  {Promise<void>}
     * @memberof UIActionUtil
     */
    static async handleAsyncActionAnime(event) {
        if (!event || !event.target) {
            return;
        }
        await ibiz.util.anime.moveAndResize(event.target, `#${PresetIdentifier.MESSAGE}`);
    }
}
