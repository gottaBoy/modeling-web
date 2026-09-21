import { RuntimeError } from '@ibiz-template/core';
/**
 * 工作流服务
 *
 * @author lxm
 * @date 2022-09-29 11:09:07
 * @export
 * @class WorkFlowService
 */
export class WorkFlowService {
    /**
     * Creates an instance of WorkFlowService.
     * @author lxm
     * @date 2022-09-29 11:09:54
     * @param {IAppDataEntity} model 应用实体
     */
    constructor(model) {
        this.model = model;
        /**
         * 常规基础路径
         *
         * @author lxm
         * @date 2022-09-29 14:09:16
         * @private
         * @type {string}
         */
        this.commonBaseUrl = '';
        this.app = ibiz.hub.getApp(model.appId);
        const appContext = ibiz.appData.context;
        this.commonBaseUrl = `/wfcore/${appContext.srfsystemid}-app-${this.app.model.codeName.toLowerCase()}/${this.model.name.toLowerCase()}`;
    }
    /**
     * 获取基础路径
     *
     * @author lxm
     * @date 2022-09-29 14:09:40
     * @private
     * @returns {*}
     */
    getBaseUrl() {
        return this.commonBaseUrl;
    }
    /**
     * 获取activeData
     *
     * @private
     * @param {IData} data
     * @param {IContext} context
     * @returns {*}
     * @memberof WorkFlowService
     */
    getActiveData(data, context) {
        if (context.srfprocessinstanceid) {
            data.srfprocessinstanceid = context.srfprocessinstanceid;
        }
        return data;
    }
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
    getWFInstanceTag(context) {
        return context.srfprocessinstanceid || 'alls';
    }
    /**
     * 根据当前步骤和任务获取工作流步骤数据（如：流程表单等）
     *
     * @author lxm
     * @date 2022-09-29 14:09:45
     * @param {IContext} context
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    async getWFStep(context) {
        const { processDefinitionKey, taskDefinitionKey } = context;
        return this.app.net.get(`${this.getBaseUrl()}/process-definitions/${processDefinitionKey}/usertasks/${taskDefinitionKey}`);
    }
    /**
     * 根据业务主键和当前步骤获取操作路径
     *
     * @author lxm
     * @date 2022-09-29 14:09:52
     * @param {IContext} context 路径参数
     * @param {IData} data 数据
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    async getWFLink(context, data) {
        const deKeyValue = context[this.model.codeName.toLowerCase()];
        const { taskDefinitionKey } = context;
        return this.app.net.post(`${this.getBaseUrl()}/${deKeyValue}/usertasks/${taskDefinitionKey}/ways`, { activedata: this.getActiveData(data, context) });
    }
    /**
     * 根据业务主键获取工作流程进度
     *
     * @author lxm
     * @date 2022-09-29 14:09:45
     * @param {IContext} context
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    async getWFHistory(context) {
        const deKeyValue = context[this.model.codeName.toLowerCase()];
        return this.app.net.get(`${this.getBaseUrl()}/${deKeyValue}/process-instances/${this.getWFInstanceTag(context)}/history`);
    }
    /**
     * 根据业务主键获取工作流流程图片
     *
     * @author lxm
     * @date 2022-10-27 16:10:13
     * @param {IContext} context
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    async getWFProcessDiagram(context) {
        const deKeyValue = context[this.model.codeName.toLowerCase()];
        return this.app.net.request(`${this.getBaseUrl()}/${deKeyValue}/process-instances/${this.getWFInstanceTag(context)}/processdiagram`, {
            method: 'post',
            data: {},
            responseType: 'blob',
        });
    }
    /**
     * 获取标准工作流版本信息
     *
     * @author lxm
     * @date 2022-09-29 14:09:45
     * @returns {*}  {Promise<IHttpResponse<IData>>}
     */
    async getWFVersion(srfWFTag) {
        return this.app.net.get(`/wfcore/${ibiz.appData.context.srfsystemid}-app-${this.app.model.codeName.toLowerCase()}/${this.model.name.toLowerCase()}${srfWFTag ? `-${srfWFTag}` : ''}/process-definitions2`);
    }
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
    async wfStart(context, params, data) {
        return this.app.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/process-instances`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async wfSubmit(context, params, data) {
        return this.app.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/tasks/${params.taskId}`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async wfWithdraw(context, params, data) {
        return this.app.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/tasks/${params.taskId}/withdraw`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async wfReassign(context, params, data) {
        return ibiz.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/tasks/${params.taskId}/transfer`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async wfAddStepBefore(context, params, data) {
        return ibiz.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/tasks/${params.taskId}/beforesign`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async wfAddStepAfter(context, params, data) {
        return ibiz.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/tasks/${params.taskId}/aftersign`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async wfSendBack(context, params, data) {
        return ibiz.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/tasks/${params.taskId}/sendback`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async wfSendCopy(context, params, data) {
        return ibiz.net.post(`${this.getBaseUrl()}/${context[this.model.codeName.toLowerCase()]}/tasks/${params.taskId}/sendcopy`, Object.assign(Object.assign({}, params), { activedata: this.getActiveData(data, context) }));
    }
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
    async exec(methodName, context, params = {}, data = {}) {
        switch (methodName) {
            case 'wfstart':
                return this.wfStart(context, params, data);
            case 'wfsubmit':
                return this.wfSubmit(context, params, data);
            case 'reassign':
                return this.wfReassign(context, params, data);
            case 'addstepbefore':
                return this.wfAddStepBefore(context, params, data);
            case 'addstepafter':
                return this.wfAddStepAfter(context, params, data);
            case 'sendback':
                return this.wfSendBack(context, params, data);
            case 'sendcopy':
                return this.wfSendCopy(context, params, data);
            default: {
                throw new RuntimeError(ibiz.i18n.t('runtime.service.noImplemented', { methodName }));
            }
        }
    }
}
