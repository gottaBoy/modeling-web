import { IDECopyParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 拷贝参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class CopyParamNode
 * @extends {DELogicNode}
 */
export declare class CopyParamNode extends DELogicNode {
    model: IDECopyParamLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=copy-param-node.d.ts.map