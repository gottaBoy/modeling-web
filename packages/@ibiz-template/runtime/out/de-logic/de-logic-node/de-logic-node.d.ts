import { IDELogicNode } from '@ibiz/model-core';
import { DELogicContext } from '../de-logic-context';
import { DELogicLink } from '../de-logic-link/de-logic-link';
/**
 * 逻辑节点
 *
 * @author lxm
 * @date 2023-02-07 19:02:16
 * @export
 * @class DELogicNode
 */
export declare abstract class DELogicNode {
    model: IDELogicNode;
    /**
     * 节点连接
     *
     * @author lxm
     * @date 2023-02-08 21:02:57
     * @type {DELogicLink[]}
     */
    readonly links: DELogicLink[];
    /**
     * Creates an instance of DELogicNode.
     *
     * @author lxm
     * @date 2023-02-08 16:02:19
     * @param {DELogicNodeModel} model
     */
    constructor(model: IDELogicNode);
    /**
     * 执行逻辑节点
     *
     * @description 此实现无需关心是否循环后续处理问题
     * @author lxm
     * @date 2023-02-08 22:02:44
     * @param {DELogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     */
    abstract exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=de-logic-node.d.ts.map