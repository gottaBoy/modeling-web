import { IHttpResponse } from '@ibiz-template/core';
import { IAppDataEntity, IDEDataExport } from '@ibiz/model-core';
import { IFileService } from '../../../interface';
export declare class FileService implements IFileService {
    protected model: IAppDataEntity;
    /**
     * Creates an instance of FileService.
     * @author lxm
     * @date 2022-11-25 13:11:49
     * @param {IAppDataEntity} model 应用实体
     */
    constructor(model: IAppDataEntity);
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
//# sourceMappingURL=file.service.d.ts.map