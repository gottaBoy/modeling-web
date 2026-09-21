import { RuntimeModelError } from '@ibiz-template/core';
import { DELogicNode } from '../de-logic-node';
/**
 * 重置参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class ResetParamNode
 * @extends {DELogicNode}
 */
export class ResetParamNode extends DELogicNode {
    async exec(ctx) {
        const { dstDELogicParamId } = this.model;
        if (!dstDELogicParamId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.missingConfiguration'));
        }
        ctx.resetParam(dstDELogicParamId);
        ibiz.log.debug(ibiz.i18n.t('runtime.deLogic.deLogicNode.resetParameter', {
            id: this.model.id,
            dstDELogicParamId,
        }));
    }
}
