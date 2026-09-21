import { IDEUIDebugParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 调试逻辑参数节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class DebugParamNode
 * @extends {UILogicNode}
 */
export declare class DebugParamNode extends UILogicNode {
    model: IDEUIDebugParamLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=debug-param-node.d.ts.map