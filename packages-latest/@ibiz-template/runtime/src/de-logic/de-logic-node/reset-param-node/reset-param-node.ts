import { RuntimeModelError } from '@ibiz-template/core';
import { IDEResetParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
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
  declare model: IDEResetParamLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    const { dstDELogicParamId } = this.model;
    if (!dstDELogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.missingConfiguration'),
      );
    }
    ctx.resetParam(dstDELogicParamId);
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.resetParameter', {
        id: this.model.id,
        dstDELogicParamId,
      }),
    );
  }
}
