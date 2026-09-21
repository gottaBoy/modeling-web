import { RuntimeModelError } from '@ibiz-template/core';
import { IDEUIBindParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { handleSrcVal } from '../../utils';
import { UILogicNode } from '../ui-logic-node';

/**
 * 绑定参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class BindParamNode
 * @extends {UILogicNode}
 */
export class BindParamNode extends UILogicNode {
  declare model: IDEUIBindParamLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    const { dstDEUILogicParamId, srcDEUILogicParamId } = this.model;
    if (!dstDEUILogicParamId || !srcDEUILogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.missingTargetParameter'),
      );
    }
    const srcVal = handleSrcVal(ctx, this.model);
    ctx.params[dstDEUILogicParamId] = srcVal;

    ctx.setLastReturn(ctx.params[dstDEUILogicParamId]);

    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.bindingParameters', {
        id: this.model.id,
        dstDEUILogicParamId,
      }),
      srcVal,
    );
  }
}
