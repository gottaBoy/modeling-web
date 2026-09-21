import { isNil } from 'ramda';
export class InternalMessageService {
    constructor() {
        /**
         * 基础路径
         * @author lxm
         * @date 2024-01-23 02:06:47
         */
        this.baseUrl = '/extension/internal_messages';
    }
    /**
     * 获取站内信的集合
     * @author lxm
     * @date 2023-11-15 10:55:25
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse<IInternalMessage[]>>}
     */
    async fetch(params = {}) {
        // 默认的查询参数
        const fetchParams = {
            page: 0,
            size: 20,
            sort: 'timestamp,desc',
        };
        Object.assign(fetchParams, params);
        const res = await ibiz.net.post(`${this.baseUrl}/fetch_cur_receiver`, fetchParams);
        if (res.headers) {
            if (res.headers['x-page']) {
                res.page = Number(res.headers['x-page']);
            }
            if (res.headers['x-per-page']) {
                res.size = Number(res.headers['x-per-page']);
            }
            if (res.headers['x-total']) {
                res.total = Number(res.headers['x-total']);
            }
        }
        if (isNil(res.data)) {
            res.data = [];
        }
        return res;
    }
    /**
     * 获取单条站内信
     * @author lxm
     * @date 2023-11-15 10:57:08
     * @param {string} messageId
     * @return {*}  {Promise<IHttpResponse<IInternalMessage[]>>}
     */
    async get(messageId) {
        const res = await ibiz.net.get(`${this.baseUrl}/${messageId}`);
        return res;
    }
    /**
     * 设置已读
     * @author lxm
     * @date 2024-02-04 03:59:52
     * @param {string} messageId
     * @return {*}  {Promise<void>}
     */
    async markRead(messageId) {
        await ibiz.net.post(`${this.baseUrl}/${messageId}/mark_read`, {});
    }
    /**
     * 批量设置已读
     * @author lxm
     * @date 2024-02-04 03:59:52
     * @param {string} messageId
     * @return {*}  {Promise<void>}
     */
    async batchMarkRead() {
        await ibiz.net.post(`${this.baseUrl}/mark_all_read`, {});
    }
    /**
     * 获取未读数据的总条数
     * @author lxm
     * @date 2024-02-04 09:34:32
     * @return {*}  {Promise<number>}
     */
    async getUnreadNum() {
        const res = await ibiz.net.post(`${this.baseUrl}/fetch_cur_receiver`, {
            page: 0,
            size: 1,
            sort: 'timestamp,desc',
            searchconds: [
                {
                    condtype: 'GROUP',
                    condop: 'AND',
                    bnotmode: false,
                    searchconds: [
                        {
                            condop: 'EQ',
                            condtype: 'DEFIELD',
                            fieldname: 'status',
                            value: 'RECEIVED',
                        },
                    ],
                },
            ],
        });
        if (res.headers['x-total']) {
            return Number(res.headers['x-total']);
        }
        return 0;
    }
}
