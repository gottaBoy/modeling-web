import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionResult, IUILogicParams } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';

/**
 * 工作流流程撤回界面行为适配器
 *
 * @author lxm
 * @date 2022-10-25 15:10:51
 * @export
 * @class WFWithdrawUIActionProvider
 * @implements {IUIActionProvider}
 */
export class WFWithdrawUIActionProvider extends UIActionProviderBase {
  async execAction(
    _action: IAppDEUIAction,
    args: IUILogicParams,
  ): Promise<IUIActionResult> {
    const { view } = args;
    const isWithdraw = await ibiz.modal.confirm({
      title: ibiz.i18n.t('runtime.controller.control.form.prompt'),
      desc: ibiz.i18n.t('runtime.uiAction.withdrawalConfirmed'),
    });
    let isCloseView = false;
    if (isWithdraw && view) {
      await view.call('WFWithdraw', args);
      isCloseView = true;
    }
    return {
      refresh: false,
      closeView: isCloseView,
    };
  }
}
