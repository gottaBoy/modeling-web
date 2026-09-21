import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IDEPrint
 */
export interface IDEPrint extends IModelObject {
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 内容类型
     * @description 值模式 [实体报表内容格式] {PDF：PDF、 HTML：HTML、 DOCX：DOCX、 XLSX：XLSX、 JSON：JSON、 XML：XML、 TEXT：TEXT、 MARKDOWN：MARKDOWN、 WORD：WORD（过期）、 EXCEL：EXCEL（过期）、 USER：用户自定义、 USER2：用户自定义2 }
     * @type {( string | 'PDF' | 'HTML' | 'DOCX' | 'XLSX' | 'JSON' | 'XML' | 'TEXT' | 'MARKDOWN' | 'WORD' | 'EXCEL' | 'USER' | 'USER2')}
     * 来源  getContentType
     */
    contentType?: string | 'PDF' | 'HTML' | 'DOCX' | 'XLSX' | 'JSON' | 'XML' | 'TEXT' | 'MARKDOWN' | 'WORD' | 'EXCEL' | 'USER' | 'USER2';
    /**
     * 数据访问标识
     * @type {string}
     * 来源  getDataAccessAction
     */
    dataAccessAction?: string;
    /**
     * 前端扩展插件
     *
     * @type {string}
     * 来源  getPSSysPFPlugin
     */
    sysPFPluginId?: string;
    /**
     * 打印标记
     * @type {string}
     * 来源  getPrintTag
     */
    printTag?: string;
    /**
     * 打印标记2
     * @type {string}
     * 来源  getPrintTag2
     */
    printTag2?: string;
    /**
     * 报表类型
     * @type {string}
     * 来源  getReportType
     */
    reportType?: string;
    /**
     * 实体默认打印
     * @type {boolean}
     * @default false
     * 来源  isDefaultMode
     */
    defaultMode?: boolean;
    /**
     * 启用多页打印
     * @type {boolean}
     * @default false
     * 来源  isEnableMulitPrint
     */
    enableMulitPrint?: boolean;
}
