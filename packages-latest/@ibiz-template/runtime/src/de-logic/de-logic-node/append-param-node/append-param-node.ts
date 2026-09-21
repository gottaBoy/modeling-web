import { RuntimeModelError } from '@ibiz-template/core';
import { IDEAppendParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { handleSrcVal } from '../../utils';
import { DELogicNode } from '../de-logic-node';

/**
 * 附加到数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class AppendParamNode
 * @extends {DELogicNode}
 */
export class AppendParamNode extends DELogicNode {
  declare model: IDEAppendParamLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    const {
      dstDELogicParamId,
      srcDELogicParamId,
      dstIndex,
      srcIndex,
      srcSize,
    } = this.model;
    if (!dstDELogicParamId || !srcDELogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.missingTargetParameter'),
      );
    }
    const srcVal = handleSrcVal(ctx, this.model) as IData[];
    const insertIndex = dstIndex || 0;
    const _srcIndex = srcIndex || 0;
    const _srcSize = srcSize || srcVal.length;

    ctx.params[dstDELogicParamId].splice(
      insertIndex,
      0,
      ...srcVal.slice(_srcIndex, _srcSize),
    );
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.additionalParameter', {
        id: this.model.id,
      }),
      ctx.params,
      ibiz.i18n.t('runtime.deLogic.deLogicNode.addedValue'),
      srcVal.slice(_srcIndex, _srcSize),
    );
  }
}
