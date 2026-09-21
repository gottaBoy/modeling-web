import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { IDEUIDELogicLogic } from '@ibiz/model-core';
import { execDELogicById } from '../../../de-logic';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 执行实体逻辑节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class ThrowExceptionNode
 * @extends {UILogicNode}
 */
export class ExecuteDELogicNode extends UILogicNode {
  declare model: IDEUIDELogicLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    const {
      dstAppDELogicId,
      dstAppDataEntityId,
      dstDEUILogicParamId,
      retDEUILogicParamId,
    } = this.model;

    // 配置报错
    if (!dstAppDataEntityId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noEntityConfigured'),
      );
    }
    if (!dstAppDELogicId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noEntityLogicConfigured'),
      );
    }
    if (!dstDEUILogicParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noIncomingLogic'),
      );
    }

    const dstParam = ctx.params[dstDEUILogicParamId];
    if (!dstParam) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.uiLogic.passedParameter', { dstDEUILogicParamId }),
      );
    }

    const result = await execDELogicById(
      dstAppDELogicId,
      dstAppDataEntityId,
      ctx.context,
      dstParam,
      ctx.params,
    );

    // 如果有返回值参数返回值填入。
    if (retDEUILogicParamId) {
      ctx.params[retDEUILogicParamId] = result;
      ctx.setLastReturn(ctx.params[retDEUILogicParamId!]);
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeExecutingEntityLogic', {
        id: this.model.id,
        dstAppDELogicId,
        dstAppDataEntityId,
        retDEUILogicParamId,
      }),
      result,
    );
  }
}
