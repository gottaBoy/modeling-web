import { IDELogicLink } from '@ibiz/model-core';
import { DELogicContext } from '../de-logic-context';
import { DELogicNode } from '../de-logic-node/de-logic-node';
import { DELogicLinkGroupCond } from './de-logic-link-group-cond/de-logic-link-group-cond';
import { IDeLogicLink, IDeLogicLinkGroupCond } from '../../interface';

/**
 * @description 实体逻辑连线
 * @export
 * @class DELogicLink
 * @implements {IDeLogicLink}
 */
export class DELogicLink implements IDeLogicLink {
  /**
   * 源节点
   *
   * @author lxm
   * @date 2023-02-08 21:02:53
   * @type {DELogicNode}
   */
  srcNode: DELogicNode | null = null;

  /**
   * 目标节点
   *
   * @author lxm
   * @date 2023-02-08 21:02:59
   * @type {DELogicNode}
   */
  dstNode: DELogicNode | null = null;

  /**
   * 连接条件组
   *
   * @author lxm
   * @date 2023-02-15 17:02:49
   * @type {(IDeLogicLinkGroupCond | null)}
   */
  groupCond: IDeLogicLinkGroupCond | null = null;

  /**
   * Creates an instance of DELogicLink.
   *
   * @author lxm
   * @date 2023-02-08 16:02:19
   * @param {DELogicLinkModel} model
   */
  constructor(public model: IDELogicLink) {
    const cond = this.model.delogicLinkGroupCond;
    if (cond) {
      this.groupCond = new DELogicLinkGroupCond(cond);
    }
  }

  /**
   * 执行连接
   *
   * @author lxm
   * @date 2023-02-08 22:02:18
   * @param {DELogicContext} ctx
   * @param {IContext} context
   * @param {IData} data
   * @return {*}  {Promise<boolean>} 是否连接成功
   */
  async exec(ctx: DELogicContext): Promise<boolean> {
    const { defaultLink } = this.model;
    if (defaultLink || !this.groupCond) {
      return true;
    }
    // 常规
    return this.groupCond.test(ctx, ctx.context, ctx.data[0] || {});
  }
}
