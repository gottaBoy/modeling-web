import { IDEUICopyParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 拷贝参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class CopyParamNode
 * @extends {UILogicNode}
 */
export declare class CopyParamNode extends UILogicNode {
    model: IDEUICopyParamLogic;
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=copy-param-node.d.ts.map