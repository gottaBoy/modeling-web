import { IDEUIThrowExceptionLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 抛出异常节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class ThrowExceptionNode
 * @extends {UILogicNode}
 */
export declare class ThrowExceptionNode extends UILogicNode {
    model: IDEUIThrowExceptionLogic;
    exec(_ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=throw-exception-node.d.ts.map