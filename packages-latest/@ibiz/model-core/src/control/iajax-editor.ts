import { IEditor } from './ieditor';

/**
 *
 * 异步处理编辑器模型基础对象接口
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
