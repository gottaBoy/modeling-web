import { IDERenewParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 重新建立参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class RenewParamNode
 * @extends {DELogicNode}
 */
export declare class RenewParamNode extends DELogicNode {
    model: IDERenewParamLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=renew-param-node.d.ts.map