import { IDEUICtrlFireEventLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 视图部件事件触发逻辑节点
 * @author lxm
 * @date 2023-03-28 01:45:08
 * @export
 * @class ViewCtrlInvokeNode
 * @extends {UILogicNode}
 */
export declare class ViewCtrlFireEventNode extends UILogicNode {
    model: IDEUICtrlFireEventLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=view-ctrl-fire-event-node.d.ts.map