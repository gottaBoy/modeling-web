import { IDELogicLink } from '@ibiz/model-core';
import { IDeLogicNode } from './i-de-logic-node';
import { IDeLogicLinkGroupCond } from './i-de-logic-link-cond';
import { IDeLogicContext } from './i-de-logic-context';
/**
 * @description 实体逻辑连线接口
 * @export
 * @interface IDeLogicLink
 */
export interface IDeLogicLink {
    /**
     * @description 源节点
     * @type {(IDeLogicNode | null)}
     * @memberof IDeLogicLink
     */
    srcNode: IDeLogicNode | null;
    /**
     * @description 目标节点
     * @type {(IDeLogicNode | null)}
     * @memberof IDeLogicLink
     */
    dstNode: IDeLogicNode | null;
    /**
     * @description 模型
     * @type {IDELogicLink}
     * @memberof IDeLogicLink
     */
    model: IDELogicLink;
    /**
     * @description 连接条件组
     * @type {(IDeLogicLinkGroupCond | null)}
     * @memberof IDeLogicLink
     */
    groupCond: IDeLogicLinkGroupCond | null;
    /**
     * @description 执行连接
     * @param {IDeLogicContext} ctx 实体逻辑执行上下文
     * @returns {*}  {Promise<boolean>}
     * @memberof IDeLogicLink
     */
    exec(ctx: IDeLogicContext): Promise<boolean>;
}
//# sourceMappingURL=i-de-logic-link.d.ts.map