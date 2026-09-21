import { IApiDownloadTicket } from '../../../interface';
export declare class DownloadTicket implements IApiDownloadTicket {
    [key: string]: any;
    /**
     * @description 文件标识
     * @type {string}
     * @memberof DownloadTicket
     */
    id: string;
    /**
     * @description 文件名称
     * @type {string}
     * @memberof DownloadTicket
     */
    name: string;
    /**
     * @description 文件分类
     * @type {string}
     * @memberof DownloadTicket
     */
    cat: string;
    /**
     * @description 文件凭证
     * @type {string}
     * @memberof DownloadTicket
     */
    ticket: string;
    /**
     * @description 过期秒数
     * @type {string}
     * @memberof DownloadTicket
     */
    expirein: string;
    /**
     * @description 过期时间（毫秒数）
     * @type {number}
     * @memberof DownloadTicket
     */
    expirationTime: number;
    /**
     * @description 超时时间（毫秒数）
     * @type {number}
     * @memberof DownloadTicket
     */
    timeout: number;
    /**
     * Creates an instance of DownloadTicket.
     * @param {IData} opts
     * @memberof DownloadTicket
     */
    constructor(opts: IData);
    /**
     * @description 是否过期
     * @readonly
     * @type {boolean}
     * @memberof DownloadTicket
     */
    get isExpirein(): boolean;
}
//# sourceMappingURL=download-ticket.d.ts.map