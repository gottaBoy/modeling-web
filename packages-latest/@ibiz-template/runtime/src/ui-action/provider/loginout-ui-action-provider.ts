import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionResult, IUILogicParams } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';

/**
 * 系统登出界面行为适配器
 *
 * @author zk
 * @date 2023-12-11 07:12:49
 * @export
 * @class LoginOutUIActionProvider
 * @extends {UIActionProviderBase}
 */
export class LoginOutUIActionProvider extends UIActionProviderBase {
  async execAction(
    _action: IAppDEUIAction,
    _params: IUILogicParams,
  ): Promise<IUIActionResult> {
    const confirm = await ibiz.confirm.info({
      title: ibiz.i18n.t('runtime.uiAction.logout'),
      desc: ibiz.i18n.t('runtime.uiAction.wantLogout'),
    });
    if (confirm) {
      await ibiz.hub.controller.logout();
    }
    return {};
  }
}
