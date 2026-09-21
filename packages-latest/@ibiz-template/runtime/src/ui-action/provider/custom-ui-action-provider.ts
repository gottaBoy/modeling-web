/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAppDEUIAction, IUIAction } from '@ibiz/model-core';
import { RuntimeModelError } from '@ibiz-template/core';
import { IUILogicParams, IUIActionResult } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';
import { ScriptFactory } from '../../utils';

export class CustomUIActionProvider extends UIActionProviderBase {
  async execAction(
    action: IAppDEUIAction,
    args: IUILogicParams,
  ): Promise<IUIActionResult> {
    const { scriptCode } = action as IUIAction;
    const { context, params, data, event, view, ctrl } = args;
    if (scriptCode) {
      const result = (await ScriptFactory.asyncExecScriptFn(
        { context, params, data, el: event?.target, view, ctrl, action },
        scriptCode,
      )) as IUIActionResult | undefined;
      return result || {};
    }
    throw new RuntimeModelError(
      action,
      ibiz.i18n.t('runtime.uiAction.missingConfigurationScriptCode'),
    );
  }
}
