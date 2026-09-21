import { RuntimeModelError } from '@ibiz-template/core';
import { IDEUICopyParamLogic } from '@ibiz/model-core';
import { clone } from 'ramda';
import { UILogicContext } from '../../ui-logic-context';
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
  declare model: IDEUICopyParamLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    const { dstDEUILogicParamId, srcDEUILogicParamId } = this.model;
    if (!dstDEUILogicParamId || !srcDEUILogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.missingTargetParameter'),
      );
    }
    const srcVal = handleSrcVal(ctx, this.model);
    ctx.params[dstDEUILogicParamId] = clone(srcVal);

    ctx.setLastReturn(ctx.params[dstDEUILogicParamId]);

    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.copyParameter', {
        id: this.model.id,
        dstDEUILogicParamId,
      }),
      srcVal,
    );
  }
}
