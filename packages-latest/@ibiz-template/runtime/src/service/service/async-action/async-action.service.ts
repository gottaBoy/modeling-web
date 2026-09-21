import { IHttpResponse, IPortalAsyncAction } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { IAsyncActionService } from '../../../interface';

/**
 * 异步操作服务
 * @author lxm
 * @date 2023-11-15 10:52:06
 * @export
 * @class AsyncActionService
 */
export class AsyncActionService implements IAsyncActionService {
  /**
   * 获取异步操作的集合
   * @author lxm
   * @date 2023-11-15 10:55:25
   * @param {IParams} [params={}]
   * @return {*}  {Promise<IHttpResponse<IPortalAsyncAction[]>>}
   */
  async fetch(
    params: IParams = {},
  ): Promise<IHttpResponse<IPortalAsyncAction[]>> {
    const res = await ibiz.net.post('/portal/asyncaction/all', params);
    if (isNil(res.data)) {
      res.data = [];
    }
    return res as IHttpResponse<IPortalAsyncAction[]>;
  }

  /**
   * 获取单条异步操作
   * @author lxm
   * @date 2023-11-15 10:57:08
   * @param {string} actionID
   * @return {*}  {Promise<IHttpResponse<IPortalAsyncAction[]>>}
   */
  async get(actionID: string): Promise<IHttpResponse<IPortalAsyncAction[]>> {
    const res = await ibiz.net.get(`/portal/asyncaction/${actionID}`);
    return res as IHttpResponse<IPortalAsyncAction[]>;
  }
}
