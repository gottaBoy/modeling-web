import { IHttpResponse } from '@ibiz-template/core';
import { DownloadTicket } from './download-ticket';
/**
 * @description 下载票据功能服务
 * @export
 * @class DownloadTicketUtil
 */
export declare class DownloadTicketUtil {
    /**
     * @description 下载票据缓存
     * @protected
     * @type {Map<string, DownloadTicket>} 键为文件id，值为下载票据对象
     * @memberof DownloadTicketUtil
     */
    protected cache: Map<string, DownloadTicket>;
    /**
     * @description 执行中缓存（防止短时间重复请求）
     * @protected
     * @type {Map<string, Promise<IHttpResponse<IData>>>}
     * @memberof DownloadTicketUtil
     */
    protected processCache: Map<string, Promise<IHttpResponse<IData>>>;
    /**
     * @description 设置下载票据
     * @param {string} fileId
     * @param {DownloadTicket} downloadTicket
     * @memberof DownloadTicketUtil
     */
    setDownloadTicket(fileId: string, downloadTicket: DownloadTicket): void;
    /**
     * @description 获取下载票据
     * @param {string} fileId
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @param {{ appEntityTag?: string; dataFieldTag?: string }} [downloadTicketParams={}]
     * @returns {*}  {(Promise<DownloadTicket | undefined>)}
     * @memberof DownloadTicketUtil
     */
    getDownloadTicket(fileId: string, context: IContext, params: IParams, data: IData, downloadTicketParams?: {
        appEntityTag?: string;
        dataFieldTag?: string;
    }): Promise<DownloadTicket | undefined>;
}
//# sourceMappingURL=download-ticket-util.d.ts.map