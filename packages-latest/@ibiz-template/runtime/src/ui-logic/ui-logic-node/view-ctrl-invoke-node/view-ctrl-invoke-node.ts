import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { IDEUICtrlInvokeLogic } from '@ibiz/model-core';
import { isFunction } from 'lodash-es';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 视图部件调用节点
 * @author lxm
 * @date 2023-03-28 01:45:08
 * @export
 * @class ViewCtrlInvokeNode
 * @extends {UILogicNode}
 */
export class ViewCtrlInvokeNode extends UILogicNode {
  declare model: IDEUICtrlInvokeLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    ctx.isEndNode = true;
    const { invokeMethod, invokeCtrlId, invokeParamId } = this.model;

    // 配置报错
    if (!invokeCtrlId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noConfiguredInterfaceObject'),
      );
    }
    if (!invokeParamId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noConfiguredOperatingParameters'),
      );
    }
    if (!invokeMethod) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.noConfiguredCallMethod'),
      );
    }

    const invokeParam = ctx.params[invokeParamId];
    if (!invokeParam) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.uiLogic.noFoundOperationParameter', {
          invokeParamId,
        }),
      );
    }

    const invokeCtrl = ctx.params[invokeCtrlId];
    if (!invokeCtrl) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.uiLogic.noFoundInterfaceObject', {
          invokeCtrlId,
        }),
      );
    }

    if (!invokeCtrl[invokeMethod] || !isFunction(invokeCtrl[invokeMethod])) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.uiLogic.noFoundInvokeMethod', {
          invokeMethod,
        }),
      );
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeViewWidgetInvocation', {
        id: this.model.id,
        invokeCtrlId,
        invokeMethod,
      }),
      invokeParam,
    );

    await invokeCtrl[invokeMethod](invokeParam);
  }
}
