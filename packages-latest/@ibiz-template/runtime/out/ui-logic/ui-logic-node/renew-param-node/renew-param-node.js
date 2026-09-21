import { RuntimeModelError } from '@ibiz-template/core';
import { UILogicNode } from '../ui-logic-node';
/**
 * 重新建立参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class RenewParamNode
 * @extends {UILogicNode}
 */
export class RenewParamNode extends UILogicNode {
    async exec(ctx) {
        const { dstDEUILogicParamId } = this.model;
        if (!dstDEUILogicParamId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.missingConfiguration'));
        }
        ctx.renewParam(dstDEUILogicParamId);
        ctx.setLastReturn(ctx.params[dstDEUILogicParamId]);
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeRebuildParameter', {
            id: this.model.id,
            dstDEUILogicParamId,
        }));
    }
}
