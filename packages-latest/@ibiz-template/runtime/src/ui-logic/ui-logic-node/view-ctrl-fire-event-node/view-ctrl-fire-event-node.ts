import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { IDEUICtrlFireEventLogic } from '@ibiz/model-core';
import { IControlController } from '../../../interface';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 视图部件事件触发逻辑节点
 * @author lxm
 * @date 2023-03-28 01:45:08
 * @export
 * @class ViewCtrlInvokeNode
 * @extends {UILogicNode}
 */
export class ViewCtrlFireEventNode extends UILogicNode {
  declare model: IDEUICtrlFireEventLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    ctx.isEndNode = true;
    const { eventName, eventParamId, fireCtrlId } = this.model;

    // 配置报错
    if (!fireCtrlId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noConfiguredTriggerObject'),
      );
    }
    if (!eventName) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noConfiguredEvent'),
      );
    }
    if (!eventParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noConfiguredEventParameters'),
      );
    }

    const invokeCtrl = ctx.params[fireCtrlId] as IControlController;
    if (!invokeCtrl) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.uiLogic.noFoundTriggerObject', { fireCtrlId }),
      );
    }

    const eventParam = ctx.params[eventParamId];
    if (!eventParam) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.uiLogic.noFoundEventParameterObject', {
          eventParamId,
        }),
      );
    }

    ibiz.log.debug(
      ibiz.i18n.t(
        'runtime.uiLogic.interfaceLogicNodeViewWidgetEventTriggerLogic',
        {
          id: this.model.id,
          fireCtrlId,
          eventName,
        },
      ),
      eventParam,
    );

    // 触发部件事件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await invokeCtrl.evt.emit(eventName as any, eventParam);
  }
}
