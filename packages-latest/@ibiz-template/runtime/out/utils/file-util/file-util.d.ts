import { IApiContext, IHttpResponse } from '@ibiz-template/core';
import { IApiDownloadTicket, IApiFileUpDownExtraParams, IApiFileUtil } from '../../interface';
import { DownloadTicketUtil } from './download-ticket/download-ticket-util';
/**
 * @description 文件工具类
 * @export
 * @class FileUtil
 * @implements {IApiFileUtil}
 */
export declare class FileUtil implements IApiFileUtil {
    /**
     * @description 下载凭证工具
     * @protected
     * @memberof FileUtil
     */
    protected downloadTicketUtil: DownloadTicketUtil;
    /**
     * @description 自定义文件上传请求头数据
     * @protected
     * @type {Record<string, string>}
     * @memberof FileUtil
     */
    protected customUploadHeaders: Record<string, string>;
    /**
     * @description 设置文件上传请求头数据
     * @param {Record<string, string>} args
     * @memberof FileUtil
     */
    setUploadHeaders(args: Record<string, string>): void;
    /**
     * @description 获取是否启用下载凭证
     * @protected
     * @param {boolean} [enableDownloadTicket]
     * @returns {*}  {boolean}
     * @memberof FileUtil
     */
    protected getEnableDownloadTicket(enableDownloadTicket?: boolean): boolean;
    /**
     * @description 获取文件上传请求头数据
     * @returns {*}  {Record<string, string>}
     * @memberof IFileUtil
     */
    getUploadHeaders(): Record<string, string>;
    /**
     * 计算OSSCat参数
     * @param url
     * @param context
     * @param OSSCatName
     * @param enableNoAccess 若启用无权限模式则在文件存储目录后面拼接特殊字符'$'
     * @param globalDownloadPrifix 是否启用全局下载文件前缀，启用则以global作为前缀
     * @returns
     */
    protected calcOSSCatUrl(url: string, context: IContext, OSSCatName?: string, enableNoAccess?: boolean, globalDownloadPrifix?: boolean): string;
    /**
     * @description 计算文件的上传路径和下载路径,下载路径文件id用%fileId%占位，替换即可;配置编辑器参数uploadParams和exportParams时，会像导航参数一样动态添加对应的参数到url上
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} [data={}]
     * @param {IApiFileUpDownExtraParams} [extraParams={}]
     * @returns {*}  {{
     *     uploadUrl: string;
     *     downloadUrl: string;
     *   }}
     * @memberof FileUtil
     */
    calcFileUpDownUrl(context: IContext, params: IParams, data?: IData, extraParams?: IApiFileUpDownExtraParams): {
        uploadUrl: string;
        downloadUrl: string;
    };
    /**
     * @description 获取下载凭证
     * @param {IApiContext} context
     * @param {IParams} params
     * @param {IData} data
     * @param {({ fileId: string } & IData)} file
     * @param {{ appEntityTag?: string; dataFieldTag?: string }} [downloadTicketParams]
     * @returns {*}  {(Promise<IApiDownloadTicket | undefined>)}
     * @memberof FileUtil
     */
    getDownloadTicket(context: IApiContext, params: IParams, data: IData, file: {
        fileId: string;
    } & IData, downloadTicketParams?: {
        appEntityTag?: string;
        dataFieldTag?: string;
    }): Promise<IApiDownloadTicket | undefined>;
    /**
     * @description 设置下载票据
     * @param {string} fileId
     * @param {IData} downloadTicket
     * @memberof FileUtil
     */
    setDownloadTicket(fileId: string, downloadTicket: IData): void;
    /**
     * @description 请求url获取文件流，并用JS触发文件下载
     * @param {string} url
     * @param {string} [name]
     * @param {({
     *       context: IContext;
     *       params: IParams;
     *       data: IData;
     *       file: { fileId: string } & IData;
     *       extraParams?: IApiFileUpDownExtraParams;
     *       downloadTicketParams?: { appEntityTag?: string; dataFieldTag?: string };
     *     })} [downloadParams]
     * @param {boolean} [enableDownloadTicket]
     * @returns {*}  {Promise<void>}
     * @memberof FileUtil
     */
    fileDownload(url: string, name?: string, downloadParams?: {
        context: IContext;
        params: IParams;
        data: IData;
        file: {
            fileId: string;
        } & IData;
        extraParams?: IApiFileUpDownExtraParams;
        downloadTicketParams?: {
            appEntityTag?: string;
            dataFieldTag?: string;
        };
    }, enableDownloadTicket?: boolean, enableNoAccess?: boolean): Promise<void>;
    /**
     * @description 文件上传
     * @param {string} uploadUrl
     * @param {Blob} file
     * @param {IData} headers
     * @returns {*}  {Promise<IData>}
     * @memberof FileUtil
     */
    fileUpload(uploadUrl: string, file: Blob, headers: IData): Promise<IData>;
    /**
     * @description 获取文件名
     * @param {IHttpResponse<IData>} response
     * @returns {*}  {string}
     * @memberof FileUtil
     */
    getFileName(response: IHttpResponse<IData>): string;
    /**
     * @description 选择文件并上传
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @param {IData} [option={}]
     * @returns {*}  {Promise<IData[]>}
     * @memberof FileUtil
     */
    chooseFileAndUpload(context: IContext, params: IParams, data: IData, option?: IData): Promise<IData[] | undefined>;
    /**
     * @description 选择文件
     * @param {string} [accept='']
     * @param {boolean} [multiple=false]
     * @returns {*}  {Promise<FileList>}
     * @memberof FileUtil
     */
    chooseFile(accept?: string, multiple?: boolean): Promise<FileList | undefined>;
    /**
     * @description 通用请求文件方法，可自定义 responseType（默认获取Blob类型的文件流，responseType 的配置决定了请求服务时返回的文件数据格式）
     * @param {string} url
     * @param {XMLHttpRequestResponseType} [responseType]
     * @param {({
     *       context: IContext;
     *       params: IParams;
     *       data: IData;
     *       file: { fileId: string } & IData;
     *       extraParams?: IApiFileUpDownExtraParams;
     *       downloadTicketParams?: { appEntityTag?: string; dataFieldTag?: string };
     *     })} [downloadParams]
     * @param {boolean} [enableDownloadTicket]
     * @returns {*}  {Promise<IData>}
     * @memberof FileUtil
     */
    requestFile(url: string, responseType?: XMLHttpRequestResponseType, downloadParams?: {
        context: IContext;
        params: IParams;
        data: IData;
        file: {
            fileId: string;
        } & IData;
        extraParams?: IApiFileUpDownExtraParams;
        downloadTicketParams?: {
            appEntityTag?: string;
            dataFieldTag?: string;
        };
    }, enableDownloadTicket?: boolean, enableNoAccess?: boolean): Promise<IData>;
    /**
     * 图片压缩
     * @param file      原始文件
     * @param maxW      最大宽度（默认 1280）
     * @param quality   压缩质量 0~1（默认 0.8）
     * @returns Promise<File> 压缩后的新文件
     */
    compressImg: (file: File, maxW?: number, quality?: number) => Promise<File>;
    /**
     * @description base64字符串转Blob对象
     * @param {string} base64
     * @returns {*}  {Blob}
     * @memberof FileUtil
     */
    base64ToBlob(base64: string): Blob;
}
//# sourceMappingURL=file-util.d.ts.map