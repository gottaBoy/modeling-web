import { RuntimeModelError } from '@ibiz-template/core';
import { UILogicNode } from '../ui-logic-node';
/**
 * 调试逻辑参数节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class DebugParamNode
 * @extends {UILogicNode}
 */
export class DebugParamNode extends UILogicNode {
    async exec(ctx) {
        const { dstDEUILogicParamId, name } = this.model;
        if (!dstDEUILogicParamId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.missingConfiguration'));
        }
        const param = ctx.params[dstDEUILogicParamId];
        ibiz.log.info(ibiz.i18n.t('runtime.uiLogic.logicalNodeOperation', { name }), param);
    }
}
