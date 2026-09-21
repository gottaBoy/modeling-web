import { IDEUIEndLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 结束节点
 *
 * @author chitanda
 * @date 2023-02-09 21:02:00
 * @export
 * @class EndNode
 * @extends {UILogicNode}
 */
export declare class EndNode extends UILogicNode {
    model: IDEUIEndLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=end-node.d.ts.map