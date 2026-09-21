import { IDEUIDEDataSetLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 数据集合节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class DataSetNode
 * @extends {UILogicNode}
 */
export declare class DataSetNode extends UILogicNode {
    model: IDEUIDEDataSetLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=data-set-node.d.ts.map