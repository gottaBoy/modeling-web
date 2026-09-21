import { RuntimeModelError } from '@ibiz-template/core';
import { IDEUIAppendParamLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { handleSrcVal } from '../../utils';
import { UILogicNode } from '../ui-logic-node';

/**
 * 附加到数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class AppendParamNode
 * @extends {DELogicNode}
 */
export class AppendParamNode extends UILogicNode {
  declare model: IDEUIAppendParamLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    const {
      dstDEUILogicParamId,
      srcDEUILogicParamId,
      dstIndex,
      srcIndex,
      srcSize,
    } = this.model;
    if (!dstDEUILogicParamId || !srcDEUILogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.missingTargetParameter'),
      );
    }
    const srcVal = handleSrcVal(ctx, this.model) as IData[];
    const insertIndex = dstIndex || 0;
    const _srcIndex = srcIndex || 0;
    const _srcSize = srcSize || srcVal.length;

    ctx.params[dstDEUILogicParamId].splice(
      insertIndex,
      0,
      ...srcVal.slice(_srcIndex, _srcSize),
    );

    ctx.setLastReturn(ctx.params[dstDEUILogicParamId]);

    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.appendedArray', { id: this.model.id }),
      ctx.params,
      ibiz.i18n.t('runtime.deLogic.deLogicNode.addedValue'),
      srcVal.slice(_srcIndex, _srcSize),
    );
  }
}
