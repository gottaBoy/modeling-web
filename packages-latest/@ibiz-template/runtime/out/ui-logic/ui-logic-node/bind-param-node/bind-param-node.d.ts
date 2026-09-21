import { IDEUIBindParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 绑定参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class BindParamNode
 * @extends {UILogicNode}
 */
export declare class BindParamNode extends UILogicNode {
    model: IDEUIBindParamLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=bind-param-node.d.ts.map