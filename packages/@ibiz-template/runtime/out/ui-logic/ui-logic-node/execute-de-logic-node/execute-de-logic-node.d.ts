import { IDEUIDELogicLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 执行实体逻辑节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class ThrowExceptionNode
 * @extends {UILogicNode}
 */
export declare class ExecuteDELogicNode extends UILogicNode {
    model: IDEUIDELogicLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=execute-de-logic-node.d.ts.map