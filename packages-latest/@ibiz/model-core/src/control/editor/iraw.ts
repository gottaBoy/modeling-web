import { IEditor } from '../ieditor';

/**
 *
 * 继承父接口类型值[RAW]
 * @export
 * @interface IRaw
 */
export interface IRaw extends IEditor {
  /**
   * 内容类型[CONTENTTYPE]{RAW|HTML|IMAGE|MARKDOWN}
   * @type {string}
   * @default RAW
   * 来源  getContentType
   */
  contentType?: string;

  /**
   * 模板内容[TEMPLATE]
   * @type {string}
   * 来源  getTemplate
   */
  template?: string;
}
