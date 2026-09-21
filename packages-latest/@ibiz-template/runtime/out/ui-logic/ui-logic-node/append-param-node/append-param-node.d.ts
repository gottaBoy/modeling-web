import { IDEUIAppendParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 附加到数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class AppendParamNode
 * @extends {DELogicNode}
 */
export declare class AppendParamNode extends UILogicNode {
    model: IDEUIAppendParamLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=append-param-node.d.ts.map