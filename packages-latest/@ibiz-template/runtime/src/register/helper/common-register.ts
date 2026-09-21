import { ISysPFPlugin } from '@ibiz/model-core';

/**
 * 获取插件的注册唯一标识
 * @author lxm
 * @date 2023-08-23 11:04:04
 * @export
 * @param {string} pluginId
 * @param {string} [appId]
 * @return {*}  {string}
 */
export async function getPluginRegisterKey(
  pluginId: string,
  appId: string,
): Promise<string | undefined> {
  let plugin = ibiz.hub.getPlugin(pluginId, appId);

  if (!plugin) {
    const app = ibiz.hub.getApp(appId);
    plugin = app.model.appPFPluginRefs?.find(
      item => item.pluginCode!.toLowerCase() === pluginId,
    );
  }

  if (!plugin) {
    ibiz.log.warn(
      ibiz.i18n.t('runtime.register.helper.matchedPlugin', {
        pluginId,
      }),
    );
    return;
  }

  await ibiz.plugin.loadPlugin(plugin as ISysPFPlugin, appId);

  return `${plugin.pluginType}_${plugin.pluginCode}`;
}
