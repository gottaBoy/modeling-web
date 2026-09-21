import { RuntimeModelError } from '@ibiz-template/core';
import { UIActionProviderBase } from './ui-action-provider-base';
import { ScriptFactory } from '../../utils';
export class CustomUIActionProvider extends UIActionProviderBase {
    async execAction(action, args) {
        const { scriptCode } = action;
        const { context, params, data, event, view, ctrl } = args;
        if (scriptCode) {
            const result = (await ScriptFactory.asyncExecScriptFn({ context, params, data, el: event === null || event === void 0 ? void 0 : event.target, view, ctrl, action }, scriptCode));
            return result || {};
        }
        throw new RuntimeModelError(action, ibiz.i18n.t('runtime.uiAction.missingConfigurationScriptCode'));
    }
}
