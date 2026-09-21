import { IDEDataImportItem } from './idedata-import-item';
import { IModelObject } from '../../imodel-object';
/**
 *
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
     * 支持自定义
     * @type {boolean}
     * @default false
     * 来源  isEnableCustomized
     */
    enableCustomized?: boolean;
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
