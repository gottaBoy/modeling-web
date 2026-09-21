import { IDEDataImportItem } from './idedata-import-item';
import { IModelObject } from '../../imodel-object';
/**
 *
 * 实体数据导入模型对象接口
 * @export
 * @interface IDEDataImport
 */
export interface IDEDataImport extends IModelObject {
    /**
     * 批导入数量
     * @type {number}
     * 来源  getBatchSize
     */
    batchSize?: number;
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 内容类型
     * @description 值模式 [实体数据导入导出内容格式] {XLSX：XLSX、 JSON：JSON、 CSV：CSV、 TSV：TSV }
     * @type {( string | 'XLSX' | 'JSON' | 'CSV' | 'TSV')}
     * 来源  getContentType
     */
    contentType?: string | 'XLSX' | 'JSON' | 'CSV' | 'TSV';
    /**
     * 建立操作标识
     * @type {string}
     * 来源  getCreateDataAccessAction
     */
    createDataAccessAction?: string;
    /**
     * 导入标记
     * @type {string}
     * 来源  getImpTag
     */
    impTag?: string;
    /**
     * 导入标记2
     * @type {string}
     * 来源  getImpTag2
     */
    impTag2?: string;
    /**
     * 导入项集合
     *
     * @type {IDEDataImportItem[]}
     * 来源  getPSDEDataImportItems
     */
    dedataImportItems?: IDEDataImportItem[];
    /**
     * 前端扩展插件
     *
     * @type {string}
     * 来源  getPSSysPFPlugin
     */
    sysPFPluginId?: string;
    /**
     * 更新操作标识
     * @type {string}
     * 来源  getUpdateDataAccessAction
     */
    updateDataAccessAction?: string;
    /**
     * 默认导入
     * @type {boolean}
     * @default false
     * 来源  isDefaultMode
     */
    defaultMode?: boolean;
    /**
     * 支持后台执行
     * @type {boolean}
     * 来源  isEnableBackend
     */
    enableBackend?: boolean;
    /**
     * 支持自定义
     * @type {boolean}
     * @default false
     * 来源  isEnableCustomized
     */
    enableCustomized?: boolean;
    /**
     * 支持前台执行
     * @type {boolean}
     * 来源  isEnableFront
     */
    enableFront?: boolean;
    /**
     * 忽略导入错误
     * @type {boolean}
     * 来源  isIgnoreError
     */
    ignoreError?: boolean;
    /**
     * 启用
     * @type {boolean}
     * @default true
     * 来源  isValid
     */
    valid?: boolean;
}
