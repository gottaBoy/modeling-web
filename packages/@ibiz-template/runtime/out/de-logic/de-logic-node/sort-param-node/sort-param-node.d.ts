import { IDESortParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 排序数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class SortParamNode
 * @extends {DELogicNode}
 */
export declare class SortParamNode extends DELogicNode {
    model: IDESortParamLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=sort-param-node.d.ts.map