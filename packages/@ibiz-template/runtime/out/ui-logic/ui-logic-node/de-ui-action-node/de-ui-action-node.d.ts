import { IDEUIActionLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 实体界面行为
 *
 * @author chitanda
 * @date 2023-02-09 19:02:09
 * @export
 * @class DEUIActionNode
 * @extends {UILogicNode}
 */
export declare class DEUIActionNode extends UILogicNode {
    model: IDEUIActionLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=de-ui-action-node.d.ts.map