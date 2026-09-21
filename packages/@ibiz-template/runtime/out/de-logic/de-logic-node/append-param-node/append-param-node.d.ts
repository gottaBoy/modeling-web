import { IDEAppendParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 附加到数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class AppendParamNode
 * @extends {DELogicNode}
 */
export declare class AppendParamNode extends DELogicNode {
    model: IDEAppendParamLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=append-param-node.d.ts.map