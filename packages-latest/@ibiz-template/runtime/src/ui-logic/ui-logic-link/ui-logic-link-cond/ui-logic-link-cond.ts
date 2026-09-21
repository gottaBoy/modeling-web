import { IUILogicLinkCond } from '../../../interface';
import { UILogicContext } from '../../ui-logic-context';

/**
 * @description 界面逻辑连接条件
 * @export
 * @abstract
 * @class UILogicLinkCond
 * @implements {IUILogicLinkCond}
 */
export abstract class UILogicLinkCond implements IUILogicLinkCond {
  /**
   * @description 条件判断
   * @abstract
   * @param {UILogicContext} ctx 界面逻辑执行上下文
   * @param {IContext} context 上下文
   * @param {IData} data 逻辑数据
   * @returns {*}  {boolean}
   * @memberof UILogicLinkCond
   */
  abstract test(ctx: UILogicContext, context: IContext, data: IData): boolean;
}
