import { RuntimeError } from '@ibiz-template/core';
import { getUILogicProvider } from '../register';
/**
 * 界面逻辑实例缓存
 */
const uiLogicMap = new Map();
/**
 * @description 执行界面逻辑
 * @export
 * @param {string} deUILogicId 界面逻辑标识
 * @param {string} appDataEntityId 应用实体标识
 * @param {IUILogicParams} parameters 界面逻辑参数
 * @returns {*}  {Promise<unknown>}
 */
export async function execUILogic(deUILogicId, appDataEntityId, parameters) {
    const app = ibiz.hub.getApp(parameters.context.srfappid);
    const deUILogic = await app.getDEUILogic(deUILogicId, appDataEntityId);
    const appDataEntity = await ibiz.hub.getAppDataEntity(appDataEntityId, parameters.context.srfappid);
    if (!deUILogic || !appDataEntity) {
        throw new RuntimeError(ibiz.i18n.t('runtime.uiLogic.interfaceLogic', {
            appDataEntityId,
            deUILogicId,
        }));
    }
    if (!uiLogicMap.has(deUILogic)) {
        const provider = getUILogicProvider(deUILogic, appDataEntity);
        await provider.init();
        uiLogicMap.set(deUILogic, provider);
    }
    ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.startExecutingInterfaceLogic', {
        appDataEntityId,
        name: deUILogic.name,
    }));
    const uiLogic = uiLogicMap.get(deUILogic);
    const result = await uiLogic.exec(parameters);
    ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.endExecutionInterfaceLogic', {
        appDataEntityId,
        name: deUILogic.name,
    }));
    return result;
}
