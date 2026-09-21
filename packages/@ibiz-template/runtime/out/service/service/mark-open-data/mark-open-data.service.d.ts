import { IHttpResponse } from '@ibiz-template/core';
import { IMarkOpenDataService, MarkOpenDataActionType, MarkOpenDataCallbackFun } from '../../../interface';
export declare class MarkOpenDataService implements IMarkOpenDataService {
    /**
     * 回调集合
     * @author lxm
     * @date 2024-02-01 04:41:45
     */
    callbackMap: Map<string, MarkOpenDataCallbackFun[]>;
    constructor();
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
     * @return {*}  {Promise<IHttpResponse>}
     */
    action(deName: string, key: string, action: MarkOpenDataActionType): Promise<IHttpResponse>;
    /**
     * 发送系统消息
     * @param name
     * @param key
     * @param action
     * @param data
     * @return {*}  {Promise<IHttpResponse>}
     */
    send(name: string, key: string, action: MarkOpenDataActionType, data: IData): Promise<IHttpResponse>;
    /**
     * 监听指定实体指定主键的消息
     * @author lxm
     * @date 2024-02-01 04:45:31
     * @param {string} deName
     * @param {string} key
     * @param {MarkOpenDataCallbackFun} callback
     */
    subscribe(deName: string, key: string, callback: MarkOpenDataCallbackFun): void;
    /**
     * 取消监听指定实体指定主键的消息
     * @author lxm
     * @date 2024-02-01 04:48:19
     * @param {string} deName
     * @param {string} key
     * @param {MarkOpenDataCallbackFun} callback
     */
    unsubscribe(deName: string, key: string, callback: MarkOpenDataCallbackFun): void;
}
//# sourceMappingURL=mark-open-data.service.d.ts.map