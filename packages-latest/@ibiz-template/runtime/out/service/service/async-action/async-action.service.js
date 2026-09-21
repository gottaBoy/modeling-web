import { isNil } from 'ramda';
/**
 * 异步操作服务
 * @author lxm
 * @date 2023-11-15 10:52:06
 * @export
 * @class AsyncActionService
 */
export class AsyncActionService {
    /**
     * 获取异步操作的集合
     * @author lxm
     * @date 2023-11-15 10:55:25
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse<IPortalAsyncAction[]>>}
     */
    async fetch(params = {}) {
        const res = await ibiz.net.post('/portal/asyncaction/all', params);
        if (isNil(res.data)) {
            res.data = [];
        }
        return res;
    }
    /**
     * 获取单条异步操作
     * @author lxm
     * @date 2023-11-15 10:57:08
     * @param {string} actionID
     * @return {*}  {Promise<IHttpResponse<IPortalAsyncAction[]>>}
     */
    async get(actionID) {
        const res = await ibiz.net.get(`/portal/asyncaction/${actionID}`);
        return res;
    }
}
