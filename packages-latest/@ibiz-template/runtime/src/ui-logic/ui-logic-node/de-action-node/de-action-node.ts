import { RuntimeModelError } from '@ibiz-template/core';
import { IDEUIDEActionLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 实体行为节点
 *
 * @author chitanda
 * @date 2023-02-09 17:02:56
 * @export
 * @class DEActionNode
 * @extends {UILogicNode}
 */
export class DEActionNode extends UILogicNode {
  declare model: IDEUIDEActionLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    const {
      dstAppDataEntityId,
      dstAppDEActionId,
      dstDEUILogicParamId,
      retDEUILogicParamId,
    } = this.model;
    if (!dstAppDataEntityId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.unspecifiedEntity'),
      );
    }
    if (!dstAppDEActionId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.unspecifiedBehavior'),
      );
    }
    const requestData = ctx.params[dstDEUILogicParamId!];
    const app = ibiz.hub.getApp(ctx.context.srfappid);
    const res = await app.deService.exec(
      dstAppDataEntityId!,
      dstAppDEActionId!,
      ctx.context,
      requestData,
      ctx.viewParam,
    );
    if (res.ok) {
      ctx.params[retDEUILogicParamId!] = res.data;
      ctx.setLastReturn(ctx.params[retDEUILogicParamId!]);
    }
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeEntityActions', {
        id: this.model.id,
        dstAppDataEntityId,
        dstAppDEActionId,
        retDEUILogicParamId,
      }),
      ctx.params[retDEUILogicParamId!],
    );
  }
}
