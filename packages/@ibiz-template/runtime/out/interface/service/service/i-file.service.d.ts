import { IHttpResponse } from '@ibiz-template/core';
import { IDEDataExport } from '@ibiz/model-core';
/**
 * 文件服务
 * @author lxm
 * @date 2023-05-15 10:44:11
 * @export
 * @interface IFileService
 */
export interface IFileService {
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
    exportData(dataExport: IDEDataExport, fetchAction: string, context: IContext, params: IParams): Promise<IHttpResponse<Blob>>;
}
//# sourceMappingURL=i-file.service.d.ts.map