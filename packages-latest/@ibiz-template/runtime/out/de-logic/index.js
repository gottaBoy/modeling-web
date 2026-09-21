import { clone } from 'ramda';
import { isArray } from 'lodash-es';
import { HttpError, HttpResponse, RuntimeError } from '@ibiz-template/core';
import { getDELogicProvider } from '../register';
import { filterFieldLogics, findDELogic } from '../model';
/**
 * 实体处理逻辑实例缓存
 */
const deLogicMap = new Map();
/**
 * @description 执行实体逻辑
 * @export
 * @param {IAppDELogic} deDELogic 实体逻辑
 * @param {IAppDataEntity} appDataEntity 应用实体
 * @param {IContext} context 上下文
 * @param {(IData | IData[])} [data={}] 数据
 * @param {IParams} [params={}] 视图参数
 * @returns {*}  {Promise<unknown>}
 */
export async function execDELogic(deDELogic, appDataEntity, context, data = {}, params = {}) {
    if (!deLogicMap.has(deDELogic)) {
        const provider = getDELogicProvider(deDELogic, appDataEntity);
        await provider.init();
        deLogicMap.set(deDELogic, provider);
    }
    ibiz.log.debug(ibiz.i18n.t('runtime.deLogic.deLogicNode.startExecuting', {
        id: deDELogic.id,
        name: deDELogic.name,
    }));
    const deLogic = deLogicMap.get(deDELogic);
    const result = await deLogic.exec({
        context,
        data: Array.isArray(data) ? data : [data],
        params,
    });
    ibiz.log.debug(ibiz.i18n.t('runtime.deLogic.deLogicNode.endExecution', {
        id: deDELogic.id,
        name: deDELogic.name,
    }));
    return result;
}
/**
 * @description 通过ID执行实体逻辑
 * @export
 * @param {string} deDELogicId 实体逻辑标识
 * @param {string} dataEntityId 应用实体标识
 * @param {IContext} context 上下文
 * @param {IData} data 数据
 * @param {IParams} params 视图参数
 * @returns {*}  {Promise<unknown>}
 */
export async function execDELogicById(deDELogicId, dataEntityId, context, data, params) {
    const appDataEntity = await ibiz.hub.getAppDataEntity(dataEntityId, context.srfappid);
    const deLogic = findDELogic(deDELogicId, appDataEntity);
    if (!deLogic) {
        throw new RuntimeError(ibiz.i18n.t('runtime.deLogic.deLogicNode.noFoundEntityLogic', {
            dataEntityId,
            deDELogicId,
        }));
    }
    return execDELogic(deLogic, appDataEntity, context, data, params);
}
/**
 * @description 执行实体逻辑行为并返回响应
 * @export
 * @param {IAppDELogic} deDELogic 实体逻辑
 * @param {IAppDataEntity} appDataEntity 应用实体
 * @param {IContext} context 上下文
 * @param {(IData | IData[])} [data] 数据
 * @param {IParams} [params] 视图参数
 * @returns {*}  {Promise<HttpResponse<IData>>}
 */
export async function execDELogicAction(deDELogic, appDataEntity, context, data, params) {
    try {
        const _context = clone(context);
        const _data = data ? clone(data) : data;
        const _params = params ? clone(params) : params;
        const result = await execDELogic(deDELogic, appDataEntity, _context, _data, _params);
        return new HttpResponse(result);
    }
    catch (err) {
        if (err instanceof HttpError) {
            return new HttpResponse(err, 500);
        }
        throw err;
    }
}
/**
 * @description 执行属性实体逻辑（单条数据）
 * @param {IAppDataEntity} entity 实体
 * @param {('compute' | 'change' | 'default')} type 逻辑类型
 * @param {IContext} context 上下文
 * @param {IData} data 实体数据
 * @param {IParams} params 视图参数
 * @returns {*}  {Promise<void>}
 */
async function execSingleFieldLogics(entity, type, context, data, params) {
    const fieldLogics = filterFieldLogics(entity, type);
    if (fieldLogics.length) {
        const promiseResult = await Promise.all(fieldLogics.map(logic => {
            return execDELogic(logic, entity, context, data, params);
        }));
        promiseResult.forEach(value => {
            Object.assign(data, value);
        });
    }
}
/**
 * @description 执行属性实体逻辑(单条或者多条)
 * @export
 * @param {IAppDataEntity} entity 实体
 * @param {('compute' | 'change' | 'default')} type 逻辑类型
 * @param {IContext} context 上下文
 * @param {(IData | IData[])} data 实体数据
 * @param {IParams} [params={}] 视图参数
 * @returns {*}  {Promise<void>}
 */
export async function execFieldLogics(entity, type, context, data, params = {}) {
    if (!data)
        return;
    if (isArray(data)) {
        await Promise.all(data.map(item => execSingleFieldLogics(entity, type, context, item, params)));
        return;
    }
    return execSingleFieldLogics(entity, type, context, data, params);
}
