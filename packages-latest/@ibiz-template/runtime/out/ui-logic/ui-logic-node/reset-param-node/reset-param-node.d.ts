import { IDEUIResetParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 重置参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class ResetParamNode
 * @extends {UILogicNode}
 */
export declare class ResetParamNode extends UILogicNode {
    model: IDEUIResetParamLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=reset-param-node.d.ts.map