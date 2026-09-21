import { IDEUILogicNode } from '@ibiz/model-core';
import { UILogicContext } from '../ui-logic-context';
import { UILogicLink } from '../ui-logic-link/ui-logic-link';
import { IUILogicNode } from '../../interface';

/**
 * 逻辑节点
 *
 * @author chitanda
 * @date 2023-02-07 19:02:16
 * @export
 * @class UILogicNode
 */
export abstract class UILogicNode implements IUILogicNode {
  /**
   * 节点连接
   *
   * @author chitanda
   * @date 2023-02-08 21:02:57
   * @type {UILogicLink[]}
   */
  readonly links: UILogicLink[];

  /**
   * Creates an instance of UILogicNode.
   * @param {IDEUILogicNode} model
   * @memberof UILogicNode
   */
  constructor(public model: IDEUILogicNode) {
    this.links = (model.deuilogicLinks || []).map(
      link => new UILogicLink(link),
    );
  }

  /**
   * @description 执行逻辑
   * @abstract
   * @param {UILogicContext} ctx 界面逻辑执行上下文
   * @returns {*}  {Promise<void>}
   * @memberof UILogicNode
   */
  abstract exec(ctx: UILogicContext): Promise<void>;
}
