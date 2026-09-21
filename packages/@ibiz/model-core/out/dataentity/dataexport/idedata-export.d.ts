import { IDEDataExportItem } from './idedata-export-item';
import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IDEDataExport
 */
export interface IDEDataExport extends IModelObject {
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 导入标记
     * @type {string}
     * 来源  getExpTag
     */
    expTag?: string;
    /**
     * 导入标记2
     * @type {string}
     * 来源  getExpTag2
     */
    expTag2?: string;
    /**
     * 最大记录数
     * @type {number}
     * 来源  getMaxRowCount
     */
    maxRowCount?: number;
    /**
     * 导出项集合
     *
     * @type {IDEDataExportItem[]}
     * 来源  getPSDEDataExportItems
     */
    dedataExportItems?: IDEDataExportItem[];
    /**
     * 前端扩展插件
     *
     * @type {string}
     * 来源  getPSSysPFPlugin
     */
    sysPFPluginId?: string;
    /**
     * 默认导出
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
}
