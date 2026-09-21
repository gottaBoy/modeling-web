import { HttpResponse } from '@ibiz-template/core';
import { IAppDataEntity, IAppDELogic } from '@ibiz/model-core';
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
export declare function execDELogic(deDELogic: IAppDELogic, context: IContext, data?: IData | IData[], params?: IParams): Promise<unknown>;
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
export declare function execDELogicById(deDELogicId: string, dataEntityId: string, context: IContext, data: IData, params: IParams): Promise<unknown>;
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
export declare function execDELogicAction(deDELogic: IAppDELogic, context: IContext, data?: IData | IData[], params?: IParams): Promise<HttpResponse<IData>>;
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
export declare function execFieldLogics(entity: IAppDataEntity, type: 'compute' | 'change' | 'default', context: IContext, data: IData | IData[], params?: IParams): Promise<void>;
//# sourceMappingURL=index.d.ts.map