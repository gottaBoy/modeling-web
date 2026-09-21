import { RuntimeModelError } from '@ibiz-template/core';
import { isArray } from 'qx-util';
import { OpenAppViewCommand } from '../../command';
import { UIActionProviderBase } from './ui-action-provider-base';
import { calcDeCodeNameById } from '../../model';
/**
 * 后台调用界面行为适配器
 *
 * @author lxm
 * @date 2022-10-25 15:10:51
 * @export
 * @class BackendUIActionProvider
 * @implements {IUIActionProvider}
 */
export class BackendUIActionProvider extends UIActionProviderBase {
    async execAction(action, args) {
        const { context, params, data, event, view } = args;
        const actionResult = {};
        const entityName = action.appDataEntityId;
        const methodName = action.appDEMethodId;
        if (!entityName || !methodName) {
            throw new RuntimeModelError(action, ibiz.i18n.t('runtime.uiAction.noEntityOrBehavior'));
        }
        // 处理参数
        const { resultContext, resultParams, resultData } = await this.handleParams(action, context, data, params);
        const tempParams = Object.assign({}, resultParams);
        // 如果有打开视图，打开视图，并把返回的数据作为子实体数据
        const frontPSAppView = action.frontAppViewId;
        if (frontPSAppView) {
            //  解析自定义 视图 option 参数
            const options = this.handleViewOptionParams(resultParams);
            const res = await ibiz.commands.execute(OpenAppViewCommand.TAG, frontPSAppView, resultContext, resultParams, Object.assign({ ctx: view.getCtx(), event }, options));
            if (!(res === null || res === void 0 ? void 0 : res.ok)) {
                actionResult.cancel = true;
                return actionResult;
            }
            if ((res === null || res === void 0 ? void 0 : res.ok) && res.data) {
                // 空数据补充一个数据
                if (resultData.length === 0) {
                    resultData.push({});
                }
                // srfactionparam只传选中数据的后台属性
                const actionData = res.data.map(item => { var _a; return ((_a = item.getOrigin) === null || _a === void 0 ? void 0 : _a.call(item)) || item || {}; });
                resultData.forEach(item => {
                    item.srfactionparam = actionData;
                });
            }
        }
        const app = ibiz.hub.getApp(context === null || context === void 0 ? void 0 : context.srfappid);
        const _data = resultData
            .map(item => { var _a; return ((_a = item.getOrigin) === null || _a === void 0 ? void 0 : _a.call(item)) || item || {}; })
            .map(item => Object.assign(item, tempParams)); // 界面行为视图参数和data合并一起传给后台
        const isMultiData = ['MULTIKEY', 'MULTIDATA'].includes(action.actionTarget);
        // 修正多数据类型界面行为上下文，修复请求接口报错
        if (isMultiData) {
            const deName = action.appDataEntityId
                ? calcDeCodeNameById(action.appDataEntityId)
                : undefined;
            if (deName &&
                resultContext[deName] &&
                resultContext[deName].indexOf(',') !== -1) {
                resultContext[deName] = resultContext[deName].split(',').join(';');
            }
        }
        const res = await app.deService.exec(entityName, methodName, resultContext, isMultiData ? _data : _data[0], tempParams);
        // 适配界面行为成功提示信息
        if (res.ok) {
            const successMsg = this.calcMessage('success', action, args);
            if (successMsg) {
                ibiz.message.success(successMsg);
            }
        }
        Object.assign(actionResult, {
            data: isArray(res.data) ? res.data : [res.data],
            nextContext: resultContext,
            nextParams: tempParams,
        });
        return actionResult;
    }
}
