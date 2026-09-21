import { HttpError, HttpResponse, RuntimeError } from '@ibiz-template/core';
import { isArray } from 'lodash-es';
import { clone } from 'ramda';
import { filterFieldLogics, findDELogic } from '../model';
import { DELogic } from './de-logic';
/**
 * 实体处理逻辑实例缓存
 */
const deLogicMap = new Map();
/**
 * 找到实体逻辑模型
 * @author lxm
 * @date 2023-08-04 02:47:16
 * @param {string} deDELogicId
 * @param {string} dataEntityId
 * @param {string} [appId]
 * @return {*}  {(Promise<IAppDELogic | undefined>)}
 */
async function findDeLogic(deDELogicId, dataEntityId, appId) {
    const appDataEntity = await ibiz.hub.getAppDataEntity(dataEntityId, appId);
    return findDELogic(deDELogicId, appDataEntity);
}
/**
 * 执行实体处理逻辑
 *
 * @author lxm
 * @date 2023-02-09 11:02:23
 * @export
 * @param {IAppDELogic} deDELogic
 * @param {IContext} context
 * @param {(IData)} data
 * @param {IParams} params
 * @param {IParams} [opt]
 * @return {*}  {Promise<HttpResponse<IData>>}
 */
export async function execDELogic(deDELogic, context, data = {}, params = {}) {
    if (!deLogicMap.has(deDELogic)) {
        deLogicMap.set(deDELogic, new DELogic(deDELogic));
    }
    ibiz.log.debug(ibiz.i18n.t('runtime.deLogic.deLogicNode.startExecuting', {
        id: deDELogic.id,
        name: deDELogic.name,
    }));
    const deLogic = deLogicMap.get(deDELogic);
    const result = await deLogic.exec(context, data, params);
    ibiz.log.debug(ibiz.i18n.t('runtime.deLogic.deLogicNode.endExecution', {
        id: deDELogic.id,
        name: deDELogic.name,
    }));
    return result;
}
/**
 * 通过id执行实体逻辑
 * @author lxm
 * @date 2023-08-04 02:49:44
 * @export
 * @param {string} deDELogicId
 * @param {string} dataEntityId
 * @param {IContext} context
 * @param {IData} data
 * @param {IParams} params
 * @return {*}  {Promise<unknown>}
 */
export async function execDELogicById(deDELogicId, dataEntityId, context, data, params) {
    const deLogic = await findDeLogic(deDELogicId, dataEntityId, context.srfappid);
    if (!deLogic) {
        throw new RuntimeError(ibiz.i18n.t('runtime.deLogic.deLogicNode.noFoundEntityLogic', {
            dataEntityId,
            deDELogicId,
        }));
    }
    return execDELogic(deLogic, context, data, params);
}
/**
 * 执行实体方法的实体逻辑并返回对应的response
 * @author lxm
 * @date 2023-03-16 12:44:43
 * @export
 * @param {IAppDELogic} deDELogic
 * @param {IContext} context
 * @param {(IData)} data
 * @param {IParams} params
 * @param {IParams} [opt]
 * @return {*}  {Promise<HttpResponse<IData>>}
 */
export async function execDELogicAction(deDELogic, context, data, params) {
    const _context = clone(context);
    const _data = data ? clone(data) : data;
    const _params = params ? clone(params) : params;
    try {
        const result = await execDELogic(deDELogic, _context, _data, _params);
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
 * 执行属性实体逻辑（单条数据）
 * @author lxm
 * @date 2023-10-19 04:00:15
 * @export
 * @param {IAppDataEntity} entity
 * @param {('compute' | 'change' | 'default')} type
 * @param {IContext} context
 * @param {IData} data
 * @param {IParams} params
 * @return {*}  {Promise<void>}
 */
async function execSingleFieldLogics(entity, type, context, data, params) {
    const fieldLogics = filterFieldLogics(entity, type);
    if (fieldLogics.length) {
        const promiseResult = await Promise.all(fieldLogics.map(logic => {
            return execDELogic(logic, context, data, params);
        }));
        promiseResult.forEach(value => {
            Object.assign(data, value);
        });
    }
}
/**
 * 执行属性实体逻辑(单条或者多条)
 * @author lxm
 * @date 2023-06-14 12:29:56
 * @export
 * @param {IAppDataEntity} entity
 * @param {('compute' | 'change' | 'default')} type
 * @param {IContext} context
 * @param {IData | IData[]} data 单条或多条数据
 * @param {IParams} params
 * @return {*}  {Promise<void>}
 */
export async function execFieldLogics(entity, type, context, data, params = {}) {
    if (!data) {
        return;
    }
    if (isArray(data)) {
        await Promise.all(data.map(item => execSingleFieldLogics(entity, type, context, item, params)));
        return;
    }
    return execSingleFieldLogics(entity, type, context, data, params);
}
