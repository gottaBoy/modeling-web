import { RuntimeModelError } from '@ibiz-template/core';
import { IDESortParamLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';

/**
 * 排序数组参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class SortParamNode
 * @extends {DELogicNode}
 */
export class SortParamNode extends DELogicNode {
  declare model: IDESortParamLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    const { dstDELogicParamId, dstSortDir, dstFieldName } = this.model;
    if (!dstDELogicParamId || !dstFieldName) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.missingParameterProperty'),
      );
    }
    const key = dstFieldName!.toLowerCase();
    const arr = ctx.params[dstDELogicParamId!] as IData[];
    arr.sort((a, b) => {
      return dstSortDir === 'ASC' ? a[key] - b[key] : b[key] - a[key];
    });
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.sortedArrayParameters', {
        id: this.model.id,
        dstFieldName,
        dstSortDir,
        dstDELogicParamId,
      }),
      arr,
    );
  }
}
