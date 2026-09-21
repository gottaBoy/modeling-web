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
     * 后台导出数据，返回文件流
     *
     * @author lxm
     * @date 2022-11-25 14:11:53
     * @param {IDEDataExport} dataExport 导出模型
     * @param {string} fetchAction 查询方法
     * @param {IContext} context 上下文
     * @param {IParams} params 请求参数
     * @returns {*}  {Promise<IHttpResponse<Blob>>}
     */
    exportData(dataExport, fetchAction, context, params) {
        const resPath = calcResPath(context, this.model);
        const exportUrl = `${resPath}/${this.model.deapicodeName2}/exportdata/${fetchAction.toLowerCase()}/?srfexporttag=${dataExport.codeName}`;
        return ibiz.net.request(exportUrl, {
            method: 'post',
            data: params,
            responseType: 'blob',
        });
    }
}
