import { RuntimeModelError } from '@ibiz-template/core';
import { IDERenewParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';

/**
 * 重新建立参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class RenewParamNode
 * @extends {DELogicNode}
 */
export class RenewParamNode extends DELogicNode {
  declare model: IDERenewParamLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    const { dstDELogicParamId } = this.model;
    if (!dstDELogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.missingConfiguration'),
      );
    }
    ctx.renewParam(dstDELogicParamId);
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.rebuildParameter', {
        id: this.model.id,
        dstDELogicParamId,
      }),
    );
  }
}
