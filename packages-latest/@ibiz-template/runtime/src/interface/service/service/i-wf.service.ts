import { IHttpResponse } from '@ibiz-template/core';

export interface IWorkFlowService {
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
   * @author chitanda
   * @date 2024-01-10 16:01:30
   * @param {string} srfWFTag
   * @return {*}  {Promise<IHttpResponse<IData>>}
   */
  getWFVersion(srfWFTag: string): Promise<IHttpResponse<IData>>;

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
  wfWithdraw(
    context: IContext,
    params: IParams,
    data: IData,
  ): Promise<IHttpResponse<IData>>;

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
  exec(
    methodName: string,
    context: IContext,
    params?: IParams,
    data?: IData,
  ): Promise<IHttpResponse<IData>>;
}
