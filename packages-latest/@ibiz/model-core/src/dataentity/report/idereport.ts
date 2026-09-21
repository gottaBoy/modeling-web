import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体报表模型对象接口
 * @export
 * @interface IDEReport
 */
export interface IDEReport extends IModelObject {
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
  contentType?:
    | string
    | 'PDF'
    | 'HTML'
    | 'DOCX'
    | 'XLSX'
    | 'JSON'
    | 'XML'
    | 'TEXT'
    | 'MARKDOWN'
    | 'WORD'
    | 'EXCEL'
    | 'USER'
    | 'USER2';

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 报表标记
   * @type {string}
   * 来源  getReportTag
   */
  reportTag?: string;

  /**
   * 报表标记2
   * @type {string}
   * 来源  getReportTag2
   */
  reportTag2?: string;

  /**
   * 报表类型
   * @type {string}
   * 来源  getReportType
   */
  reportType?: string;

  /**
   * 报表界面模型
   * @type {string}
   * 来源  getReportUIModel
   */
  reportUIModel?: string;

  /**
   * 系统统一资源代码
   * @type {string}
   * 来源  getSysUniResCode
   */
  sysUniResCode?: string;

  /**
   * 支持日志
   * @type {boolean}
   * @default false
   * 来源  isEnableLog
   */
  enableLog?: boolean;

  /**
   * 多页报表
   * @type {boolean}
   * @default false
   * 来源  isMultiPage
   */
  multiPage?: boolean;
}
