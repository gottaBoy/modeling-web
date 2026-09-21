/**
 * 获取插件的注册唯一标识
 * @author lxm
 * @date 2023-08-23 11:04:04
 * @export
 * @param {string} pluginId
 * @param {string} [appId]
 * @return {*}  {string}
 */
export async function getPluginRegisterKey(pluginId, appId) {
    var _a;
    let plugin = ibiz.hub.getPlugin(pluginId, appId);
    if (!plugin) {
        const app = ibiz.hub.getApp(appId);
        plugin = (_a = app.model.appPFPluginRefs) === null || _a === void 0 ? void 0 : _a.find(item => item.pluginCode.toLowerCase() === pluginId);
    }
    if (!plugin) {
        ibiz.log.warn(ibiz.i18n.t('runtime.register.helper.matchedPlugin', {
            pluginId,
        }));
        return;
    }
    await ibiz.plugin.loadPlugin(plugin, appId);
    return `${plugin.pluginType}_${plugin.pluginCode}`;
}
