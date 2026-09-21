import { IHttpResponse } from '@ibiz-template/core';
export declare class FileUtil {
    /**
     * 计算OSSCat参数
     *
     * @author zk
     * @date 2024-01-26 02:01:52
     * @param {string} url
     * @param {IContext} context
     * @return {*}  {string}
     * @memberof FileUtil
     */
    protected calcOSSCatUrl(url: string, context: IContext, OSSCatName?: string): string;
    /**
     * 计算文件的上传路径和下载路径
     * 下载路径文件id用%fileId%占位，替换即可
     * 配置编辑器参数uploadParams和exportParams时，会像导航参数一样动态添加对应的参数到url上
     *
     * @author zk
     * @date 2024-01-26 02:01:15
     * @param {IData} data
     * @param {IContext} context
     * @param {IParams} params
     * @param {IParams} uploadParams
     * @param {IParams} exportParams
     * @return {*}  {{
     *     uploadUrl: string;
     *     downloadUrl: string;
     *   }}
     * @memberof FileUtil
     */
    calcFileUpDownUrl(context: IContext, params: IParams, data?: IData, extraParams?: IData): {
        uploadUrl: string;
        downloadUrl: string;
    };
    /**
     * 请求url获取文件流，并用JS触发文件下载
     *
     * @author zk
     * @date 2024-01-26 02:01:29
     * @param {{ url: string; name: string }} file
     * @memberof FileUtil
     */
    fileDownload(url: string, name?: string): Promise<void>;
    /**
     * 文件上传
     *
     * @author zk
     * @date 2024-01-26 05:01:35
     * @param {string} uploadUrl
     * @param {Blob} file
     * @param {IData} headers
     * @return {*}  {Promise<IData>}
     * @memberof FileUtil
     */
    fileUpload(uploadUrl: string, file: Blob, headers: IData): Promise<IData>;
    /**
     * 获取文件名
     *
     * @param {IHttpResponse<IData>} response
     * @return {*}  {string}
     * @memberof FileUtil
     */
    getFileName(response: IHttpResponse<IData>): string;
    /**
     * 选择文件并上传
     *
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @param {IData} [option={}]
     * @return {*}  {Promise<IData[]>}
     * @memberof FileUtil
     */
    chooseFileAndUpload(context: IContext, params: IParams, data: IData, option?: IData): Promise<IData[]>;
    /**
     * 选择文件
     *
     * @param {string} [accept='']
     * @param {boolean} [multiple=false]
     * @return {*}  {Promise<FileList>}
     * @memberof FileUtil
     */
    chooseFile(accept?: string, multiple?: boolean): Promise<FileList>;
}
//# sourceMappingURL=file-util.d.ts.map