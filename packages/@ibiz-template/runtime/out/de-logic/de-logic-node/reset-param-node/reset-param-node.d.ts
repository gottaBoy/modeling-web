import { IDEResetParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 重置参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class ResetParamNode
 * @extends {DELogicNode}
 */
export declare class ResetParamNode extends DELogicNode {
    model: IDEResetParamLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=reset-param-node.d.ts.map