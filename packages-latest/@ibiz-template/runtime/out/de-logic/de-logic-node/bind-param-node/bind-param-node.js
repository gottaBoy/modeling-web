import { RuntimeModelError } from '@ibiz-template/core';
import { handleSrcVal } from '../../utils';
import { DELogicNode } from '../de-logic-node';
/**
 * 绑定参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class BindParamNode
 * @extends {DELogicNode}
 */
export class BindParamNode extends DELogicNode {
    async exec(ctx) {
        const { dstDELogicParamId, srcDELogicParamId } = this.model;
        if (!dstDELogicParamId || !srcDELogicParamId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.missingTargetParameter'));
        }
        const srcVal = handleSrcVal(ctx, this.model);
        ctx.params[dstDELogicParamId] = srcVal;
        ibiz.log.debug(ibiz.i18n.t('runtime.deLogic.deLogicNode.logicNodeParameterName', {
            id: this.model.id,
            dstDELogicParamId,
        }), srcVal);
    }
}
