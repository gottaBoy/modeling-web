import { IUIAction } from '../../view/iuiaction';

/**
 *
 * @export
 * @interface IAppUIAction
 */
export interface IAppUIAction extends IUIAction {
  /**
   * 行为附加上下文Json字符串
   * @type {string}
   * 来源  getContextJOString
   */
  contextJOString?: string;

  /**
   * 计数项标识
   * @type {string}
   * 来源  getCounterId
   */
  counterId?: string;
}
