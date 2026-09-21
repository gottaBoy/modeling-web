import { execDELogicAction } from '../../de-logic';
import { calcDeCodeNameById, findDELogic } from '../../model';
import { ScriptFactory } from '../script';
/**
 * 根据计数器数据，计算项显示状态
 *
 * @author zhanghengfeng
 * @date 2024-05-16 19:05:55
 * @export
 * @param {(IDRBarItemsState | IDRTabPagesState)} item
 * @param {AppCounter} [counter]
 * @return {*}  {(boolean | undefined)}
 */
export function calcItemVisibleByCounter(item, counter) {
    const { enableMode, counterId } = item;
    if (!counter || !counterId) {
        return;
    }
    if (enableMode === 'COUNT_GTE_ZERO') {
        if (counter.getCounter(counterId) >= 0) {
            return true;
        }
        return false;
    }
    if (enableMode === 'COUNT_GT_ZERO') {
        if (counter.getCounter(counterId) > 0) {
            return true;
        }
        return false;
    }
}
/**
 * 根据启用模式，计算项显示状态
 *
 * @author zhanghengfeng
 * @date 2024-05-16 19:05:46
 * @export
 * @param {(IDRBarItemsState | IDRTabPagesState)} item
 * @param {IContext} context
 * @param {IParams} params
 * @param {string} appDeId
 * @param {string} appId
 * @param {IData} [data]
 * @return {*}  {(Promise<boolean | undefined>)}
 */
export async function calcItemVisible(item, context, params, appDeId, appId, data) {
    const { enableMode, dataAccessAction, testAppDELogicId, testScriptCode } = item;
    if (enableMode === 'DEOPPRIV' && dataAccessAction) {
        const app = ibiz.hub.getApp(context.srfappid);
        const result = await app.authority.calcByDataAccessAction(dataAccessAction, context, data, appDeId);
        return !!result;
    }
    if (enableMode === 'DELOGIC' && testAppDELogicId && appDeId && appId) {
        const entityModel = await ibiz.hub.getAppDataEntity(appDeId, appId);
        const deLogic = findDELogic(testAppDELogicId, entityModel);
        if (deLogic) {
            const result = await execDELogicAction(deLogic, context, data, params);
            return !!result.data;
        }
    }
    if (enableMode === 'SCRIPT' && testScriptCode) {
        const result = ScriptFactory.execScriptFn({
            data,
            context,
            params,
        }, testScriptCode, {
            isAsync: false,
            singleRowReturn: true,
        });
        return !!result;
    }
}
/**
 * 获取指定实体数据的主实体数据
 *
 * @export
 * @param {IData} data
 * @param {string} appDataEntityId
 * @param {IContext} context
 * @return {*}  {Promise<IData>}
 */
export async function getDeDataMajorField(data, context, appDataEntityId) {
    var _a;
    const majorData = {};
    const appDe = await ibiz.hub.getAppDataEntity(appDataEntityId, context.appId);
    if (appDe && appDe.minorAppDERSs && appDe.minorAppDERSs.length > 0) {
        (_a = appDe.minorAppDERSs) === null || _a === void 0 ? void 0 : _a.forEach((minorAppDERS) => {
            if (minorAppDERS.majorAppDataEntityId &&
                minorAppDERS.parentAppDEFieldId) {
                const majorAppDataEntityCodeName = calcDeCodeNameById(minorAppDERS.majorAppDataEntityId);
                if (majorAppDataEntityCodeName &&
                    data[minorAppDERS.parentAppDEFieldId]) {
                    majorData[majorAppDataEntityCodeName] =
                        data[minorAppDERS.parentAppDEFieldId];
                }
            }
        });
    }
    return majorData;
}
