import { RuntimeError } from '@ibiz-template/core';
import { UILogic } from './ui-logic';
/**
 * 界面行为实例缓存
 */
const uiLogicMap = new Map();
/**
 * 执行界面行为
 *
 * @author chitanda
 * @date 2023-02-09 11:02:23
 * @export
 * @param {IPSDEUILogic} deUILogic
 * @param {IContext} context
 * @param {(IData[] | null)} data
 * @param {IParams} params
 * @param {IParams} [opt]
 * @return {*}  {Promise<unknown>}
 */
export async function execUILogic(deUILogicId, appDataEntityId, parameters) {
    const app = ibiz.hub.getApp(parameters.context.srfappid);
    const deUILogic = await app.getDEUILogic(deUILogicId, appDataEntityId);
    if (!deUILogic) {
        throw new RuntimeError(ibiz.i18n.t('runtime.uiLogic.interfaceLogic', {
            appDataEntityId,
            deUILogicId,
        }));
    }
    if (!uiLogicMap.has(deUILogic)) {
        uiLogicMap.set(deUILogic, new UILogic(deUILogic));
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
