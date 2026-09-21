import { IDEThrowExceptionLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 抛出异常节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class ThrowExceptionNode
 * @extends {DELogicNode}
 */
export declare class ThrowExceptionNode extends DELogicNode {
    model: IDEThrowExceptionLogic;
    exec(_ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=throw-exception-node.d.ts.map