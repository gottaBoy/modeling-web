import { RuntimeModelError } from '@ibiz-template/core';
import { IDEUIResetParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 重置参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class ResetParamNode
 * @extends {UILogicNode}
 */
export class ResetParamNode extends UILogicNode {
  declare model: IDEUIResetParamLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    const { dstDEUILogicParamId } = this.model;
    if (!dstDEUILogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.missingConfiguration'),
      );
    }
    ctx.resetParam(dstDEUILogicParamId);
    ctx.setLastReturn(ctx.params[dstDEUILogicParamId!]);
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeResetParameter', {
        id: this.model.id,
        dstDEUILogicParamId,
      }),
    );
  }
}
