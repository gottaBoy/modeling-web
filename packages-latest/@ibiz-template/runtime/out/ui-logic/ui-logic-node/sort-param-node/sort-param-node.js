import { RuntimeModelError } from '@ibiz-template/core';
import { UILogicNode } from '../ui-logic-node';
/**
 * 排序数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class SortParamNode
 * @extends {UILogicNode}
 */
export class SortParamNode extends UILogicNode {
    async exec(ctx) {
        const { dstDEUILogicParamId, dstSortDir, dstFieldName } = this.model;
        if (!dstDEUILogicParamId || !dstFieldName) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.missingParameterProperty'));
        }
        const key = dstFieldName;
        const arr = ctx.params[dstDEUILogicParamId];
        arr.sort((a, b) => {
            return dstSortDir === 'ASC' ? a[key] - b[key] : b[key] - a[key];
        });
        ctx.setLastReturn(ctx.params[dstDEUILogicParamId]);
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeSortedArrayParameters', {
            id: this.model.id,
            dstFieldName,
            dstSortDir,
            dstDEUILogicParamId,
        }), arr);
    }
}
