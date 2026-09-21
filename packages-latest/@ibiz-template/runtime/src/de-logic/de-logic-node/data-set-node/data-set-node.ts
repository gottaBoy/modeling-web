import { IDEDEDataSetLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';

/**
 * 数据集合节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class DataSetNode
 * @extends {DELogicNode}
 */
export class DataSetNode extends DELogicNode {
  declare model: IDEDEDataSetLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    const {
      dstAppDEDataSetId,
      dstAppDataEntityId,
      dstDELogicParamId,
      retDELogicParamId,
    } = this.model;
    const queryParams = ctx.params[dstDELogicParamId!];
    const app = ibiz.hub.getApp(ctx.context.srfappid);
    const res = await app.deService.exec(
      dstAppDataEntityId!,
      dstAppDEDataSetId!,
      ctx.context,
      queryParams,
    );
    if (res.ok) {
      ctx.params[retDELogicParamId!] = res.data;
    }
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.dataSet', {
        id: this.model.id,
        dstAppDataEntityId,
        dstAppDEDataSetId,
        retDELogicParamId,
      }),
      ctx.params[retDELogicParamId!],
    );
  }
}
