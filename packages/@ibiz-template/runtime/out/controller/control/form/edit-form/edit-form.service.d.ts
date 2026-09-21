import { IHttpResponse } from '@ibiz-template/core';
import { IDEEditForm } from '@ibiz/model-core';
import { ControlVO } from '../../../../service';
import { FormService } from '../form/form.service';
export declare class EditFormService<T extends IDEEditForm = IDEEditForm> extends FormService<T> {
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
     * @param {IData} data 数据
     * @returns {*}
     */
    create(context: IContext, data: IData): Promise<IHttpResponse<ControlVO>>;
    /**
     * 更新数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}
     */
    update(context: IContext, data: IData): Promise<IHttpResponse<ControlVO>>;
    /**
     * 返回操作
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}
     */
    goBack(context: IContext, data: IData): Promise<IHttpResponse<ControlVO>>;
    /**
     * 表单项更新
     *
     * @author lxm
     * @date 2022-09-15 21:09:34
     * @param {string} methodName
     * @param {IContext} context
     * @param {IParams} [params={}]
     * @returns {*}  {Promise<IHttpResponse<ControlVO>>}
     */
    updateFormItem(methodName: string, context: IContext, data?: IData, params?: IParams): Promise<IHttpResponse<ControlVO>>;
    /**
     * 工作流启动
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @param {IParams} [params={}] 视图参数
     * @returns {*}
     */
    wfStart(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 工作流提交
     *
     * @author lxm
     * @date 2022-09-07 19:09:11
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @param {IParams} [params={}] 视图参数
     * @returns {*}
     */
    wfSubmit(context: IContext, params: IParams, data: IData): Promise<IHttpResponse<IData>>;
    /**
     * 初始化属性映射
     *
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    protected initUIDataMap(): void;
    /**
     * 处理响应
     *
     * @author lxm
     * @date 2022-08-31 17:08:13
     * @param {IHttpResponse} res
     * @returns {*}  {IHttpResponse}
     */
    handleResponse(response: IHttpResponse): IHttpResponse<ControlVO>;
}
//# sourceMappingURL=edit-form.service.d.ts.map