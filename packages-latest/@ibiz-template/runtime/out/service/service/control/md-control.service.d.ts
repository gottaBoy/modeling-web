import { IHttpResponse } from '@ibiz-template/core';
import { IAppDEDataExport, IMDAjaxControl } from '@ibiz/model-core';
import { ControlVO } from '../../vo/control.vo';
import { ControlService } from './control.service';
export declare class MDControlService<T extends IMDAjaxControl = IMDAjaxControl> extends ControlService<T> {
    /**
     * 执行查询多条数据的方法
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @param {IParams} [args={}] 额外参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    fetch(context: IContext, params?: IParams, args?: IParams): Promise<IHttpResponse<ControlVO[]>>;
    /**
     * 执行获取单条数据方法
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    get(context: IContext, params?: IParams): Promise<IHttpResponse<ControlVO>>;
    /**
     * 执行获取草稿方法
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}  {Promise<IHttpResponse>}
     */
    getDraft(context: IContext, params?: IParams): Promise<IHttpResponse<ControlVO>>;
    /**
     * 删除单条数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:48
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}
     */
    remove(context: IContext, params?: IParams): Promise<IHttpResponse>;
    /**
     * 新建数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {ControlVO} data 数据
     * @returns {*}
     */
    create(context: IContext, data: ControlVO): Promise<IHttpResponse<ControlVO>>;
    /**
     * 更新数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {ControlVO} data 数据
     * @returns {*}
     */
    update(context: IContext, data: ControlVO): Promise<IHttpResponse<ControlVO>>;
    /**
     * 批量更新数据
     *
     * @author chitanda
     * @date 2023-12-21 10:12:09
     * @param {IContext} context
     * @param {ControlVO[]} data
     * @return {*}  {Promise<void>}
     */
    updateBatch(context: IContext, data: ControlVO[]): Promise<IHttpResponse<ControlVO[]>>;
    /**
     * @description 导出数据
     * @param {IAppDEDataExport} dataExport 导出模型
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 请求参数
     * @returns {*}  {Promise<boolean>}
     * @memberof MDControlService
     */
    exportData(dataExport: IAppDEDataExport, context: IContext, params?: IParams): Promise<boolean>;
    /**
     * 处理响应
     *
     * @author lxm
     * @date 2022-08-31 17:08:13
     * @param {IHttpResponse} res
     * @returns {*}  {IHttpResponse}
     */
    handleResponse(response: IHttpResponse): IHttpResponse;
}
//# sourceMappingURL=md-control.service.d.ts.map