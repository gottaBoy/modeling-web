import { RuntimeModelError } from '@ibiz-template/core';
import { IDEDEActionLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';

/**
 * 实体行为节点
 *
 * @author lxm
 * @date 2023-02-09 17:02:56
 * @export
 * @class DEActionNode
 * @extends {DELogicNode}
 */
export class DEActionNode extends DELogicNode {
  declare model: IDEDEActionLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    const {
      dstAppDataEntityId,
      dstAppDEActionId,
      dstDELogicParamId,
      retDELogicParamId,
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
    const requestData = ctx.params[dstDELogicParamId!];
    const app = ibiz.hub.getApp(ctx.context.srfappid);
    const res = await app.deService.exec(
      dstAppDataEntityId!,
      dstAppDEActionId!,
      ctx.context,
      requestData,
      ctx.viewParam,
    );
    if (res.ok) {
      ctx.params[retDELogicParamId!] = res.data;
    }
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.entityActions', {
        id: this.model.id,
        dstAppDataEntityId,
        dstAppDEActionId,
        retDELogicParamId,
      }),
      ctx.params[retDELogicParamId!],
    );
  }
}
