import { IDEUIMsgBoxLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 消息弹窗节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class MsgBoxNode
 * @extends {UILogicNode}
 */
export declare class MsgBoxNode extends UILogicNode {
    model: IDEUIMsgBoxLogic;
    protected typeMap: {
        readonly INFO: "info";
        readonly QUESTION: "success";
        readonly WARNING: "warning";
        readonly ERROR: "error";
    };
    exec(ctx: UILogicContext): Promise<void>;
}
//# sourceMappingURL=msg-box-node.d.ts.map