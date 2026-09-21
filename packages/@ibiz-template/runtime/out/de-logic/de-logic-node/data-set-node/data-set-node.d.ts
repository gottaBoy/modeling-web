import { IDEDEDataSetLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';
/**
 * 数据集合节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class DataSetNode
 * @extends {DELogicNode}
 */
export declare class DataSetNode extends DELogicNode {
    model: IDEDEDataSetLogic;
    exec(ctx: DELogicContext): Promise<void>;
}
//# sourceMappingURL=data-set-node.d.ts.map