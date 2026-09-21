import { IDEEndLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 结束节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class EndNode
 * @extends {DELogicNode}
 */
export declare class EndNode extends DELogicNode {
    model: IDEEndLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=end-node.d.ts.map