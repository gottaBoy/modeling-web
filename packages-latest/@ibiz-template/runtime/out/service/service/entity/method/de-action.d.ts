import { HttpResponse, IHttpResponse } from '@ibiz-template/core';
import { IAppDEAction } from '@ibiz/model-core';
import { Method } from './method';
import { IDataEntity } from '../../../../interface';
/**
 * 实体行为方法
 *
 * @author chitanda
 * @date 2022-10-10 12:10:37
 * @export
 * @class DEActionMethod
 * @extends {Method}
 */
export declare class DEActionMethod extends Method {
    method: IAppDEAction;
    /**
     * 处理请求发送参数
     * @author lxm
     * @date 2023-10-19 02:50:36
     * @param {IContext} context 上下文
     * @param {(IData | IData[])} data 数据对象
     * @return {*}  {(Promise<IData | IData[]>)}
     */
    inputHandle(context: IContext, data: IData | IData[]): Promise<IData | IData[]>;
    /**
     * 格式化输入参数
     *
     * @author tony001
     * @date 2024-05-21 23:05:26
     * @param {IContext} context
     * @param {(IData | IData[])} data
     * @return {*}  {(Promise<IData | IData[]>)}
     */
    inputFormat(context: IContext, data: IData | IData[]): Promise<IData | IData[]>;
    exec(context: IContext, data?: IData | IData[], params?: IParams, header?: IData): Promise<HttpResponse<IData>>;
    /**
     * 执行本地方法
     *
     * @author tony001
     * @date 2024-08-16 08:08:32
     * @param {string} methodTag
     * @param {IContext} context
     * @param {(IData | IData[])} [data]
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    executeLocalMethod(methodTag: string, context: IContext, data?: IData | IData[]): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 创建数据
     *
     * @author chitanda
     * @date 2022-08-24 20:08:01
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IHttpResponse<IData>>}
     */
    create(context: IContext, data?: IData | IData[], params?: IParams, header?: IData): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 删除数据
     *
     * @author chitanda
     * @date 2022-08-24 20:08:56
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    remove(context: IContext, params?: IParams, header?: IData): Promise<IHttpResponse<IDataEntity | IDataEntity[]>>;
    /**
     * 更新数据
     *
     * @author chitanda
     * @date 2022-09-13 19:09:39
     * @param {IContext} context
     * @param {(IData | IDataEntity)} data
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    update(context: IContext, data?: IData | IData[], params?: IParams, header?: IData): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 获取数据
     *
     * @author chitanda
     * @date 2022-08-24 20:08:07
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    get(context: IContext, params?: IParams, header?: IData): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 获取默认数据
     *
     * @author chitanda
     * @date 2022-08-24 20:08:26
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IHttpResponse<IData>>}
     */
    getDraft(context: IContext, params?: IParams, header?: IData): Promise<IHttpResponse<IData>>;
    /**
     * 新建临时数据
     *
     * @author chitanda
     * @date 2022-08-21 17:08:45
     * @param {IContext} context
     * @param {IData} entity
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    createTemp(context: IContext, entity: IData | IData[]): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 获取临时数据默认值
     *
     * @author chitanda
     * @date 2022-08-21 17:08:56
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    getDraftTemp(_context: IParams, _params?: IParams): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 删除临时数据
     *
     * @author chitanda
     * @date 2022-08-21 17:08:11
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    removeTemp(context: IContext, params?: IParams): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 关联删除
     *
     * @author chitanda
     * @date 2024-01-17 16:01:47
     * @protected
     * @param {string} key
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<void>}
     */
    protected associationDeletion(key: string, context: IContext, _params?: IParams): Promise<void>;
    /**
     * 更新临时数据
     *
     * @author chitanda
     * @date 2022-08-21 17:08:17
     * @param {IContext} context
     * @param {IData} entity
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    updateTemp(context: IContext, entity: IData | IData[]): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 获取临时数据
     *
     * @author chitanda
     * @date 2022-08-21 17:08:23
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IHttpResponse<IDataEntity>>}
     */
    getTemp(context: IContext, params?: IParams): Promise<IHttpResponse<IDataEntity>>;
    /**
     * 批量删除本地数据
     *
     * @param {IContext} context
     * @param {IParams} [params]
     * @return {*}  {Promise<IHttpResponse>}
     */
    removeBatchTemp(context: IContext, srfKeys: string[]): Promise<IHttpResponse<IDataEntity[]>>;
    /**
     * 在新建、更新时，根据界面域下的关系，自动填充相关父属性
     *
     * @author chitanda
     * @date 2024-01-02 15:01:30
     * @protected
     * @param {IContext} context
     * @param {IDataEntity} data
     * @return {*}  {IDataEntity}
     */
    protected attach(context: IContext, data: IDataEntity): IDataEntity;
    /**
     * @description 移动位置
     * @param {IContext} context
     * @param {IParams} params
     * @returns {*}  {Promise<IHttpResponse<IDataEntity>>}
     * @memberof DEActionMethod
     */
    moveOrder(context: IContext, params: IParams): Promise<IHttpResponse<IDataEntity[]>>;
}
//# sourceMappingURL=de-action.d.ts.map