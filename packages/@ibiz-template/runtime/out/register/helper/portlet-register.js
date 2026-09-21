import { getPluginRegisterKey } from './common-register';
/** 门户部件成员适配器前缀 */
export const PORTLET_PROVIDER_PREFIX = 'PORTLET';
/**
 * 注册门户部件成员适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IPortletProvider} callback 生成门户部件成员适配器的回调
 */
export function registerPortletProvider(key, callback) {
    ibiz.register.register(`${PORTLET_PROVIDER_PREFIX}_${key}`, callback);
}
function getProvider(key) {
    return ibiz.register.get(`${PORTLET_PROVIDER_PREFIX}_${key}`);
}
/**
 * 获取门户部件成员适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IPortletProvider>}
 */
export async function getPortletProvider(model) {
    let provider;
    const { portletType, sysPFPluginId, appId } = model;
    // 找插件适配器
    if (sysPFPluginId) {
        const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
        if (pluginKey) {
            provider = getProvider(pluginKey);
        }
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.portalWidgetPlugin', {
                pluginKey,
            }));
        }
        else {
            return provider;
        }
    }
    // 找门户部件成员类型
    provider = getProvider(portletType);
    if (!provider) {
        ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.portalWidgetMemberType', {
            portletType,
        }));
    }
    else {
        return provider;
    }
}
