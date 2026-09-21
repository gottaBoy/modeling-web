import { RuntimeModelError } from '@ibiz-template/core';
import { IDEUIDEDataSetLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 数据集合节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class DataSetNode
 * @extends {UILogicNode}
 */
export class DataSetNode extends UILogicNode {
  declare model: IDEUIDEDataSetLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    const {
      dstAppDEDataSetId,
      dstAppDataEntityId,
      dstDEUILogicParamId,
      retDEUILogicParamId,
    } = this.model;
    if (!dstDEUILogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.missingfilter'),
      );
    }
    const queryParams = ctx.params[dstDEUILogicParamId!];
    const app = ibiz.hub.getApp(ctx.context.srfappid);
    const res = await app.deService.exec(
      dstAppDataEntityId!,
      dstAppDEDataSetId!,
      ctx.context,
      queryParams,
    );
    if (res.ok) {
      ctx.params[retDEUILogicParamId!] = res.data;
      ctx.setLastReturn(ctx.params[dstDEUILogicParamId]);
    }
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeDataSet', {
        id: this.model.id,
        dstAppDataEntityId,
        dstAppDEDataSetId,
        retDEUILogicParamId,
      }),
      ctx.params[retDEUILogicParamId!],
    );
  }
}
