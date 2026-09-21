import { IDEUISortParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 排序数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class SortParamNode
 * @extends {UILogicNode}
 */
export declare class SortParamNode extends UILogicNode {
    model: IDEUISortParamLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=sort-param-node.d.ts.map