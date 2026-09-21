import { IHttpResponse } from '@ibiz-template/core';
import { IAppDEDataImport, IAppDataEntity } from '@ibiz/model-core';
export type ImportDataResult = {
    /**
     * 是否是异步导入
     */
    isAsync?: boolean;
    /**
     * 是否取消
     */
    cancel?: boolean;
    total?: number;
    success?: number;
    message?: string;
    errorMessage?: string;
};
export type IExportDataResult = {
    ok: boolean;
    url?: string;
};
/**
 * 异步作业导入方法
 *
 * @author zk
 * @date 2023-10-31 02:10:06
 * @export
 * @param {File} file
 * @param {IAppDataEntity} appDataEntity
 * @return {*}  {Promise<IData>}
 */
export declare function asyncImportData(file: File, appDataEntity: IAppDataEntity, dataImport?: IAppDEDataImport, context?: IContext, params?: IParams): Promise<void>;
/**
 * 标准导入方法
 *
 * @author zk
 * @date 2023-10-31 02:10:29
 * @export
 * @param {File} file
 * @param {IAppDataEntity} appDataEntity
 * @return {*}  {Promise<IData>}
 */
export declare function importData(file: File, appDataEntity: IAppDataEntity, dataImport?: IAppDEDataImport, context?: IContext, params?: IParams): Promise<ImportDataResult>;
/**
 * 新的导入，异步导入和同步导入内部判断
 * 异步导入不等待，同步等待结果后返回
 * @author lxm
 * @date 2024-04-16 03:34:56
 * @export
 * @param {{
 *   selectedFile: File;
 *   appDataEntity: IAppDataEntity;
 *   dataImport?: IAppDEDataImport;
 *   context?: IContext;
 * }} opts
 * @return {*}  {Promise<ImportDataResult>}
 */
export declare function importData2(opts: {
    selectedFile: File;
    appDataEntity: IAppDataEntity;
    dataImport?: IAppDEDataImport;
    context?: IContext;
    params?: IParams;
}): Promise<ImportDataResult>;
/**
 * 标准导出方法
 *
 * @author zk
 * @date 2023-10-31 09:10:13
 * @export
 * @param {string[]} header
 * @param {IData[][]} data
 * @param {string} fileName
 * @return {*}  {Promise<IExportDataResult>}
 */
export declare function exportData(header: string[], data: IData[][], fileName: string): Promise<IExportDataResult>;
/**
 * 获取导入相关模型
 * @author lxm
 * @date 2024-04-15 04:54:29
 * @export
 * @param {{
 *   deDataImportId: string;
 *   appDataEntityId: string;
 *   appId?: string;
 * }} opts
 * @return {*}  {Promise<{ dataImport: IAppDEDataImport; appDataEntity: IAppDataEntity }>}
 */
export declare function getDataImportModels(opts: {
    deDataImportId: string;
    appDataEntityId: string;
    appId?: string;
}): Promise<{
    deDataImport: IAppDEDataImport;
    appDataEntity: IAppDataEntity;
}>;
/**
 * 打开数据导入界面
 * @author lxm
 * @date 2024-04-15 01:51:20
 * @export
 * @param {{
 *   deDataImportId: string;
 *   appDataEntityId: string;
 *   dataImportViewId?: string;
 *   context: IContext;
 *   params: IParams;
 * }} opts
 * @return {*}  {Promise<void>}
 */
export declare function openDataImport(opts: {
    deDataImportId: string;
    appDataEntityId: string;
    dataImportViewId?: string;
    context: IContext;
    params: IParams;
}): Promise<void>;
/**
 * 下载导入模版文件
 * @author lxm
 * @date 2024-04-15 05:49:53
 * @export
 * @param {IAppDataEntity} appDataEntity
 * @param {IAppDEDataImport} dataImport
 * @return {*}  {Promise<void>}
 */
export declare function downloadImportTemplate(appDataEntity: IAppDataEntity, dataImport?: IAppDEDataImport, context?: IContext, params?: IParams): Promise<void>;
/**
 * 选择文件并导入
 * @author lxm
 * @date 2024-04-16 02:31:24
 * @export
 * @param {{}} opts
 * @return {*}  {Promise<void>}
 */
export declare function selectAndImport(opts: {
    appDataEntity: IAppDataEntity;
    dataImport?: IAppDEDataImport;
    context?: IContext;
    params?: IParams;
}): Promise<ImportDataResult>;
/**
 * 自定义导入数据方法
 * @author lxm
 * @date 2024-04-18 03:30:46
 * @export
 * @param {{
 *   appDataEntity: IAppDataEntity;
 *   context?: IContext;
 *   fileId: string; 导入文件id
 *   schemaId: string; 导入模版id
 * }} opts
 */
export declare function asyncImportData2(opts: {
    appDataEntity: IAppDataEntity;
    dataImport?: IAppDEDataImport;
    context?: IContext;
    fileId: string;
    schemaId: string;
}): Promise<void>;
export type ImportSchemaField = {
    name: string;
    index: number;
    caption: string;
};
export type ImportSchemaData = {
    id?: string;
    name: string;
    fields: ImportSchemaField[];
    system_tag: string;
    data_entity_tag: string;
    import_tag: string;
    owner_type: string;
};
/**
 * 计算导入模型的schema数据
 * @author lxm
 * @date 2024-04-18 04:29:36
 * @export
 * @param {{
 *   appDataEntity?: IAppDataEntity;
 *   dataImport?: IAppDEDataImport;
 *   data: Partial<ImportSchemaData>;
 * }} opts
 * @return {*}  {ImportSchemaData}
 */
export declare function calcImportSchemaData(opts: {
    appDataEntity?: IAppDataEntity;
    dataImport?: IAppDEDataImport;
    data: Partial<ImportSchemaData>;
}): ImportSchemaData;
/**
 * 创建新的schema
 * @author lxm
 * @date 2024-04-18 04:26:03
 * @export
 * @param {{
 *   appDataEntity?: IAppDataEntity;
 *   dataImport?: IAppDEDataImport;
 *   data: Partial<ImportSchemaData>;
 * }} opts
 * @return {*}
 */
export declare function createImportSchema(opts: {
    appDataEntity?: IAppDataEntity;
    dataImport?: IAppDEDataImport;
    data: Partial<ImportSchemaData>;
}): Promise<IHttpResponse<IData>>;
/**
 * 更新已有的schema
 * @author lxm
 * @date 2024-04-18 04:26:03
 * @export
 * @param {{
 *   appDataEntity?: IAppDataEntity;
 *   dataImport?: IAppDEDataImport;
 *   data: Partial<ImportSchemaData>;
 * }} opts
 * @return {*}
 */
export declare function updateImportSchema(opts: {
    appDataEntity?: IAppDataEntity;
    dataImport?: IAppDEDataImport;
    data: Partial<ImportSchemaData>;
}): Promise<IHttpResponse<IData>>;
/**
 * 获取指定id的schema数据
 * @author lxm
 * @date 2024-04-18 04:47:03
 * @export
 * @param {string} id
 * @return {*}  {Promise<IHttpResponse<IData>>}
 */
export declare function getImportSchema(id: string): Promise<IHttpResponse<IData>>;
/**
 * 删除指定id的schema数据
 * @author lxm
 * @date 2024-04-18 04:47:03
 * @export
 * @param {string} id
 * @return {*}  {Promise<IHttpResponse<IData>>}
 */
export declare function deleteImportSchema(id: string): Promise<IHttpResponse<IData>>;
/**
 * 获取当前用户的指定实体和实体导入的schema集合数据
 * @author lxm
 * @date 2024-04-18 04:53:25
 * @export
 * @param {{
 *   appDataEntity: IAppDataEntity;
 *   dataImport?: IAppDEDataImport;
 * }} opts
 * @return {*}  {Promise<IHttpResponse<IData[]>>}
 */
export declare function fetchImportSchemas(opts: {
    appDataEntity: IAppDataEntity;
    dataImport?: IAppDEDataImport;
}): Promise<IHttpResponse<IData[]>>;
//# sourceMappingURL=data-file-util.d.ts.map