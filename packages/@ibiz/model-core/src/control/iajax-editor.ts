import { IEditor } from './ieditor';

/**
 *
 * @export
 * @interface IAjaxEditor
 */
export interface IAjaxEditor extends IEditor {
  /**
   * 处理器类型
   * @type {string}
   * 来源  getHandlerType
   */
  handlerType?: string;
}
