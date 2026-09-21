import { IDEBindParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 绑定参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class BindParamNode
 * @extends {DELogicNode}
 */
export declare class BindParamNode extends DELogicNode {
    model: IDEBindParamLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=bind-param-node.d.ts.map