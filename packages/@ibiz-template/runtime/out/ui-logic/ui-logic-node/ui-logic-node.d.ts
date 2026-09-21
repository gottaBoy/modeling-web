import { IDEUILogicNode } from '@ibiz/model-core';
import { UILogicContext } from '../ui-logic-context';
import { UILogicLink } from '../ui-logic-link/ui-logic-link';
/**
 * 逻辑节点
 *
 * @author chitanda
 * @date 2023-02-07 19:02:16
 * @export
 * @class UILogicNode
 */
export declare abstract class UILogicNode {
    model: IDEUILogicNode;
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
     *
     * @author chitanda
     * @date 2023-02-08 16:02:19
     * @param {UILogicNodeModel} model
     */
    constructor(model: IDEUILogicNode);
    /**
     * 执行界面行为
     *
     * @description 此实现无需关心是否循环后续处理问题
     * @author chitanda
     * @date 2023-02-08 22:02:44
     * @param {UILogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     */
    abstract exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=ui-logic-node.d.ts.map