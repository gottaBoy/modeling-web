import { IUIAction } from '../../view/iuiaction';

/**
 *
 * 应用界面行为模型对象接口
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
