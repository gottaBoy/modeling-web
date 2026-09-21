import { RuntimeModelError } from '@ibiz-template/core';
import { IDECopyParamLogic } from '@ibiz/model-core';
import { clone } from 'ramda';
import { DELogicContext } from '../../de-logic-context';
import { handleSrcVal } from '../../utils';
import { DELogicNode } from '../de-logic-node';

/**
 * 拷贝参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class CopyParamNode
 * @extends {DELogicNode}
 */
export class CopyParamNode extends DELogicNode {
  declare model: IDECopyParamLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    const { dstDELogicParamId, srcDELogicParamId } = this.model;
    if (!dstDELogicParamId || !srcDELogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.missingTargetParameter'),
      );
    }
    const srcVal = handleSrcVal(ctx, this.model);
    ctx.params[dstDELogicParamId] = clone(srcVal);
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.copyParameter', {
        id: this.model.id,
        dstDELogicParamId,
      }),
      srcVal,
    );
  }
}
