import { IDEUILogicNode } from '@ibiz/model-core';
import { IUILogicContext, IUILogicLink } from '../ui-logic';

/**
 * @description 界面逻辑前端节点适配器
 * @export
 * @interface IUILogicNodeProvider
 */
export interface IUILogicNodeProvider {
  /**
   * @description 逻辑连线
   * @type {IUILogicLink[]}
   * @memberof IUILogicNodeProvider
   */
  links: IUILogicLink[];
  /**
   * @description 节点模型
   * @type {IDEUILogicNode}
   * @memberof IUILogicNodeProvider
   */
  model: IDEUILogicNode;
  /**
   * @description 执行界面逻辑
   * @param {IUILogicContext} ctx 界面逻辑执行上下文
   * @returns {*}  {Promise<void>}
   * @memberof IUILogicNodeProvider
   */
  exec(ctx: IUILogicContext): Promise<void>;
}
