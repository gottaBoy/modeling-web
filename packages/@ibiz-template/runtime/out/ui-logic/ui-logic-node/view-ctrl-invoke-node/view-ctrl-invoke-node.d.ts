import { IDEUICtrlInvokeLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 视图部件调用节点
 * @author lxm
 * @date 2023-03-28 01:45:08
 * @export
 * @class ViewCtrlInvokeNode
 * @extends {UILogicNode}
 */
export declare class ViewCtrlInvokeNode extends UILogicNode {
    model: IDEUICtrlInvokeLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=view-ctrl-invoke-node.d.ts.map