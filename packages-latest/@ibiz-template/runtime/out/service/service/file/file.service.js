import { calcResPath } from '../../utils';
export class FileService {
    /**
     * Creates an instance of FileService.
     * @author lxm
     * @date 2022-11-25 13:11:49
     * @param {IAppDataEntity} model 应用实体
     */
    constructor(model) {
        this.model = model;
    }
    /**
     * @description 后台导出数据，返回文件流
     * @param {IDEDataExport} dataExport 导出模型
     * @param {string} fetchAction 查询方法
     * @param {IContext} context 上下文
     * @param {IParams} params 请求参数
     * @deprecated 已弃用，请使用 export 方法，参数一致
     * @returns {*}  {Promise<IHttpResponse<Blob>>}
     * @memberof FileService
     */
    exportData(dataExport, fetchAction, context, params) {
        const resPath = calcResPath(context, this.model);
        const exportUrl = `${resPath}/${this.model.deapicodeName2}/exportdata/${fetchAction.toLowerCase()}`;
        //  查询参数
        const queryParam = { srfexporttag: dataExport.codeName };
        if (context === null || context === void 0 ? void 0 : context.srfdatatype) {
            Object.assign(queryParam, { srfdatatype: context.srfdatatype });
        }
        return ibiz.net.request(exportUrl, {
            method: 'post',
            params: queryParam,
            data: params,
            responseType: 'blob',
        });
    }
    /**
     * @description 导出
     * @param {IDEDataExport} dataExport 导出模型
     * @param {string} fetchAction 查询方法
     * @param {IContext} context 上下文
     * @param {IParams} params 请求参数
     * @returns {*}  {Promise<boolean>}
     * @memberof FileService
     */
    export(dataExport, fetchAction, context, params) {
        const resPath = calcResPath(context, this.model);
        const url = `${resPath}/${this.model.deapicodeName2}/exportdata/${fetchAction.toLowerCase()}`;
        //  查询参数
        const queryParam = { srfexporttag: dataExport.codeName };
        if (context === null || context === void 0 ? void 0 : context.srfdatatype) {
            Object.assign(queryParam, { srfdatatype: context.srfdatatype });
        }
        return ibiz.platform.backendExport({
            url,
            data: params,
            method: 'post',
            params: queryParam,
        });
    }
}
