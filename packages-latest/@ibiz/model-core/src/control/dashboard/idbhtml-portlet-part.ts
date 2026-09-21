import { IDBSysPortletPart } from './idbsys-portlet-part';

/**
 *
 * Html页面门户部件模型对象接口
 * 继承父接口类型值[HTML]
 * @export
 * @interface IDBHtmlPortletPart
 */
export interface IDBHtmlPortletPart extends IDBSysPortletPart {
  /**
   * 内容显示模式
   * @description 值模式 [门户部件HTML内容显示模式] {INNER：嵌入、 IFRAME：IFrame }
   * @type {( string | 'INNER' | 'IFRAME')}
   * 来源  getHtmlShowMode
   */
  htmlShowMode?: string | 'INNER' | 'IFRAME';

  /**
   * 网页地址
   * @type {string}
   * 来源  getPageUrl
   */
  pageUrl?: string;
}
