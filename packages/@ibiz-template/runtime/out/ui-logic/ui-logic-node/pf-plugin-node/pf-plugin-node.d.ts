import { IDEUIPFPluginLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 前端插件节点
 *
 * @author chitanda
 * @date 2023-11-01 18:11:55
 * @export
 * @class PFPluginNode
 * @extends {UILogicNode}
 */
export declare class PFPluginNode extends UILogicNode {
    model: IDEUIPFPluginLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=pf-plugin-node.d.ts.map