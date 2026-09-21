import { getPluginRegisterKey } from './common-register';
/** 工具栏项适配器前缀 */
export const TOOLBAR_ITEM_PROVIDER_PREFIX = 'TOOLBAR_ITEM';
/**
 * 注册工具栏项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-15 18:05:26
 * @export
 * @param {string} key
 * @param {() => IToolbarItemProvider} callback
 */
export function registerToolbarItemProvider(key, callback) {
    ibiz.register.register(`${TOOLBAR_ITEM_PROVIDER_PREFIX}_${key}`, callback);
}
/**
 * 获取适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-15 18:05:06
 * @param {string} key
 * @return {*}  {(IToolbarItemProvider | undefined)}
 */
function getProvider(key) {
    return ibiz.register.get(`${TOOLBAR_ITEM_PROVIDER_PREFIX}_${key}`);
}
/**
 * 获取工具栏项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-15 18:05:47
 * @export
 * @param {IDEToolbarItem} model
 * @return {*}  {(Promise<IToolbarItemProvider | undefined>)}
 */
export async function getToolbarItemProvider(model) {
    let provider;
    const { sysPFPluginId, appId } = model;
    // 找插件适配器
    if (sysPFPluginId) {
        const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
        if (pluginKey) {
            provider = getProvider(pluginKey);
        }
        if (!provider) {
            ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.toolbarItem', {
                pluginKey,
            }));
        }
        else {
            return provider;
        }
    }
    return provider;
}
