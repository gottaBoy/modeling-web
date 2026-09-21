import { IDEDEActionLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 实体行为节点
 *
 * @author lxm
 * @date 2023-02-09 17:02:56
 * @export
 * @class DEActionNode
 * @extends {DELogicNode}
 */
export declare class DEActionNode extends DELogicNode {
    model: IDEDEActionLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=de-action-node.d.ts.map