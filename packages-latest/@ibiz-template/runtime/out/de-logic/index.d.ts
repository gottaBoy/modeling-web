import { IAppDataEntity, IAppDELogic } from '@ibiz/model-core';
import { HttpResponse } from '@ibiz-template/core';
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
export declare function execDELogic(deDELogic: IAppDELogic, appDataEntity: IAppDataEntity, context: IContext, data?: IData | IData[], params?: IParams): Promise<unknown>;
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
export declare function execDELogicById(deDELogicId: string, dataEntityId: string, context: IContext, data: IData, params: IParams): Promise<unknown>;
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
export declare function execDELogicAction(deDELogic: IAppDELogic, appDataEntity: IAppDataEntity, context: IContext, data?: IData | IData[], params?: IParams): Promise<HttpResponse<IData>>;
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
export declare function execFieldLogics(entity: IAppDataEntity, type: 'compute' | 'change' | 'default', context: IContext, data: IData | IData[], params?: IParams): Promise<void>;
//# sourceMappingURL=index.d.ts.map