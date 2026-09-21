import { RuntimeError } from '@ibiz-template/core';
import { getPluginRegisterKey } from './common-register';
/** 界面行为适配器前缀 */
export const UIACTION_PROVIDER_PREFIX = 'UIACTION';
/**
 * 注册界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IUIActionProvider} callback 生成界面行为适配器的回调
 */
export function registerUIActionProvider(key, callback) {
    ibiz.register.register(`${UIACTION_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key) {
    return ibiz.register.get(`${UIACTION_PROVIDER_PREFIX}_${key}`);
}
/**
 * 获取界面行为适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IUIActionProvider>}
 */
export async function getUIActionProvider(model) {
    let provider;
    const { uiactionMode, sysPFPluginId, appId, uiactionTag } = model;
    // 找插件适配器
    if (sysPFPluginId) {
        const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
        if (pluginKey) {
            provider = getProvider(pluginKey);
        }
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.interfaceBehaviorPlugin', {
                pluginKey,
            }));
        }
        else {
            return provider;
        }
    }
    // 先通过uiactionTag找界面行为适配器
    provider = getProvider(`${uiactionMode}_${uiactionTag}`);
    if (provider) {
        return provider;
    }
    // 找界面行为类型
    provider = getProvider(uiactionMode);
    if (!provider) {
        throw new RuntimeError(ibiz.i18n.t('runtime.register.helper.interfaceBehaviorMode', {
            uiactionMode,
        }));
    }
    else {
        return provider;
    }
}
