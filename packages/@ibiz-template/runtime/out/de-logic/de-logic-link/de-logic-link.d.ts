import { IDELogicLink } from '@ibiz/model-core';
import { DELogicContext } from '../de-logic-context';
import { DELogicNode } from '../de-logic-node/de-logic-node';
import { DELogicLinkGroupCond } from './de-logic-link-group-cond/de-logic-link-group-cond';
/**
 *
 * @author lxm
 * @date 2023-02-08 16:02:10
 * @export
 * @class DELogicLink
 */
export declare class DELogicLink {
    model: IDELogicLink;
    /**
     * 源节点
     *
     * @author lxm
     * @date 2023-02-08 21:02:53
     * @type {DELogicNode}
     */
    srcNode: DELogicNode | null;
    /**
     * 目标节点
     *
     * @author lxm
     * @date 2023-02-08 21:02:59
     * @type {DELogicNode}
     */
    dstNode: DELogicNode | null;
    /**
     * 连接条件组
     *
     * @author lxm
     * @date 2023-02-15 17:02:49
     * @type {(DELogicLinkGroupCond | null)}
     */
    groupCond: DELogicLinkGroupCond | null;
    /**
     * Creates an instance of DELogicLink.
     *
     * @author lxm
     * @date 2023-02-08 16:02:19
     * @param {DELogicLinkModel} model
     */
    constructor(model: IDELogicLink);
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
    exec(ctx: DELogicContext): Promise<boolean>;
}
//# sourceMappingURL=de-logic-link.d.ts.map