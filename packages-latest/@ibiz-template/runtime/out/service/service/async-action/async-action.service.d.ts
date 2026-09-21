import { IHttpResponse, IPortalAsyncAction } from '@ibiz-template/core';
import { IAsyncActionService } from '../../../interface';
/**
 * 异步操作服务
 * @author lxm
 * @date 2023-11-15 10:52:06
 * @export
 * @class AsyncActionService
 */
export declare class AsyncActionService implements IAsyncActionService {
    /**
     * 获取异步操作的集合
     * @author lxm
     * @date 2023-11-15 10:55:25
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse<IPortalAsyncAction[]>>}
     */
    fetch(params?: IParams): Promise<IHttpResponse<IPortalAsyncAction[]>>;
    /**
     * 获取单条异步操作
     * @author lxm
     * @date 2023-11-15 10:57:08
     * @param {string} actionID
     * @return {*}  {Promise<IHttpResponse<IPortalAsyncAction[]>>}
     */
    get(actionID: string): Promise<IHttpResponse<IPortalAsyncAction[]>>;
}
//# sourceMappingURL=async-action.service.d.ts.map