import { IHttpResponse } from '@ibiz-template/core';
import { IDESearchForm } from '@ibiz/model-core';
import { ControlVO } from '../../../../service';
import { FormService } from '../form/form.service';
/**
 * 搜索表单服务
 *
 * @author lxm
 * @date 2022-09-22 17:09:06
 * @export
 * @class SearchFormService
 * @extends {ControlService<T>}
 * @template T
 */
export declare class SearchFormService<T extends IDESearchForm = IDESearchForm> extends FormService<T> {
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
//# sourceMappingURL=search-form.service.d.ts.map