import { RuntimeModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { handleSrcVal } from '../../utils';
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
export class CopyParamNode extends UILogicNode {
    async exec(ctx) {
        const { dstDEUILogicParamId, srcDEUILogicParamId } = this.model;
        if (!dstDEUILogicParamId || !srcDEUILogicParamId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.uiLogic.missingTargetParameter'));
        }
        const srcVal = handleSrcVal(ctx, this.model);
        ctx.params[dstDEUILogicParamId] = clone(srcVal);
        ctx.setLastReturn(ctx.params[dstDEUILogicParamId]);
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.copyParameter', {
            id: this.model.id,
            dstDEUILogicParamId,
        }), srcVal);
    }
}
