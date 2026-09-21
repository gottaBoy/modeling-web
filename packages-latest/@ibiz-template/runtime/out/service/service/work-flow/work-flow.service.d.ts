import { IHttpResponse } from '@ibiz-template/core';
import { IAppDataEntity } from '@ibiz/model-core';
import { IWorkFlowService } from '../../../interface';
/**
 * 工作流服务
 *
 * @author lxm
 * @date 2022-09-29 11:09:07
 * @export
 * @class WorkFlowService
 */
export declare class WorkFlowService implements IWorkFlowService {
    protected model: IAppDataEntity;
    private app;
    /**
     * 常规基础路径
     *
     * @author lxm
     * @date 2022-09-29 14:09:16
     * @private
     * @type {string}
     */
    private commonBaseUrl;
    /**
     * Creates an instance of WorkFlowService.
     * @author lxm
     * @date 2022-09-29 11:09:54
     * @param {IAppDataEntity} model 应用实体
     */
    constructor(model: IAppDataEntity);
    /**
     * 获取基础路径
     *
     * @author lxm
     * @date 2022-09-29 14:09:40
     * @private
     * @returns {*}
     */
    private getBaseUrl;
    /**
     * 获取activeData
     *
     * @private
     * @param {IData} data
     * @param {IContext} context
     * @returns {*}
     * @memberof WorkFlowService
     */
    private getActiveData;
    /**
     * 获取工作流实例标记
     *
     * @author zk
     * @date 2023-11-06 06:11:07
     * @private
     * @param {IContext} context
     * @return {*}  {string}
     * @memberof WorkFlowService
     */
    private getWFInstanceTag;
    /**
     * 根据当前步骤和任务获取工作流步骤数据（如：流程表单等）
     *
     * @author lxm
     * @date 2022-09-29 14:09:45
     * @param {IContext} context
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    getWFStep(context: IContext): Promise<IHttpResponse<IData>>;
    /**
     * 根据业务主键和当前步骤获取操作路径
     *
     * @author lxm
     * @date 2022-09-29 14:09:52
     * @param {IContext} context 路径参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    getWFLink(context: IContext, data: IData): Promise<IHttpResponse<IData[]>>;
    /**
     * 根据业务主键获取工作流程进度
     *
     * @author lxm
     * @date 2022-09-29 14:09:45
     * @param {IContext} context
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    getWFHistory(context: IContext): Promise<IHttpResponse<IData>>;
    /**
     * 根据业务主键获取工作流流程图片
     *
     * @author lxm
     * @date 2022-10-27 16:10:13
     * @param {IContext} context
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    getWFProcessDiagram(context: IContext): Promise<IHttpResponse<IData>>;
    /**
     * 获取标准工作流版本信息
     *
     * @author lxm
     * @date 2022-09-29 14:09:45
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    getWFVersion(srfWFTag?: string): Promise<IHttpResponse<IData>>;
    /**
     * 启动工作流
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfStart(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 提交工作流
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfSubmit(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 工作流撤销
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfWithdraw(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 转办
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfReassign(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 前加签
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfAddStepBefore(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 后加签
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfAddStepAfter(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 回退
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfSendBack(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 抄送
     *
     * @author lxm
     * @date 2022-09-30 17:09:51
     * @param {IContext} context 路径参数
     * @param {IParams} params 请求参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    wfSendCopy(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 调用工作流接口
     *
     * @author lxm
     * @date 2022-09-30 17:09:38
     * @param {string} methodName 接口名称
     * @param {IContext} context 路径参数
     * @param {IParams} [params={}] 查询参数
     * @param {IData} [data={}] 主数据数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    exec(methodName: string, context: IContext, params?: IParams, data?: IData): Promise<IHttpResponse<IData>>;
}
//# sourceMappingURL=work-flow.service.d.ts.map