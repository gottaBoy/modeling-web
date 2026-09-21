import { IDEUIDEActionLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 实体行为节点
 *
 * @author chitanda
 * @date 2023-02-09 17:02:56
 * @export
 * @class DEActionNode
 * @extends {UILogicNode}
 */
export declare class DEActionNode extends UILogicNode {
    model: IDEUIDEActionLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=de-action-node.d.ts.map