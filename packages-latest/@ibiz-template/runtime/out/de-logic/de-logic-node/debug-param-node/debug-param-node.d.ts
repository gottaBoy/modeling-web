import { IDEDebugParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * @description 调试逻辑参数节点
 * @export
 * @class DebugParamNode
 * @extends {DELogicNode}
 */
export declare class DebugParamNode extends DELogicNode {
    model: IDEDebugParamLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=debug-param-node.d.ts.map