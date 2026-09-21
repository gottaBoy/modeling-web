import { RuntimeModelError } from '@ibiz-template/core';
import { DELogicNode } from '../de-logic-node';
/**
 * @description 调试逻辑参数节点
 * @export
 * @class DebugParamNode
 * @extends {DELogicNode}
 */
export class DebugParamNode extends DELogicNode {
    async exec(ctx) {
        const { dstDELogicParamId, name } = this.model;
        if (!dstDELogicParamId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.deLogic.deLogicNode.missingConfiguration'));
        }
        const param = ctx.params[dstDELogicParamId];
        ibiz.log.info(ibiz.i18n.t('runtime.deLogic.deLogicNode.logicalNodeOperation', { name }), param);
    }
}
