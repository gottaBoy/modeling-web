import { IHttpResponse, IInternalMessage } from '@ibiz-template/core';
import { IInternalMessageService } from '../../../interface';
export declare class InternalMessageService implements IInternalMessageService {
    /**
     * 基础路径
     * @author lxm
     * @date 2024-01-23 02:06:47
     */
    protected baseUrl: string;
    /**
     * 获取站内信的集合
     * @author lxm
     * @date 2023-11-15 10:55:25
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse<IInternalMessage[]>>}
     */
    fetch(params?: IParams): Promise<IHttpResponse<IInternalMessage[]>>;
    /**
     * 获取单条站内信
     * @author lxm
     * @date 2023-11-15 10:57:08
     * @param {string} messageId
     * @return {*}  {Promise<IHttpResponse<IInternalMessage[]>>}
     */
    get(messageId: string): Promise<IHttpResponse<IInternalMessage>>;
    /**
     * 设置已读
     * @author lxm
     * @date 2024-02-04 03:59:52
     * @param {string} messageId
     * @return {*}  {Promise<void>}
     */
    markRead(messageId: string): Promise<void>;
    /**
     * 批量设置已读
     * @author lxm
     * @date 2024-02-04 03:59:52
     * @param {string} messageId
     * @return {*}  {Promise<void>}
     */
    batchMarkRead(): Promise<void>;
    /**
     * 获取未读数据的总条数
     * @author lxm
     * @date 2024-02-04 09:34:32
     * @return {*}  {Promise<number>}
     */
    getUnreadNum(): Promise<number>;
}
//# sourceMappingURL=internal-message.service.d.ts.map