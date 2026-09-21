import { IAppDEACMode } from '@ibiz/model-core';
import { getPluginRegisterKey } from './common-register';
import { IAcItemProvider } from '../../interface';

/** 自填列表项适配器前缀 */
export const AC_ITEM_PROVIDER_PREFIX = 'AC_ITEM';

/**
 * 注册自填列表项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-21 17:05:15
 * @export
 * @param {string} key
 * @param {() => IAcItemProvider} callback
 */
export function registerAcItemProvider(
  key: string,
  callback: () => IAcItemProvider,
): void {
  ibiz.register.register(`${AC_ITEM_PROVIDER_PREFIX}_${key}`, callback);
}

/**
 * 获取适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-21 17:05:35
 * @param {string} key
 * @return {*}  {(IAcItemProvider | undefined)}
 */
function getProvider(key: string): IAcItemProvider | undefined {
  return ibiz.register.get(
    `${AC_ITEM_PROVIDER_PREFIX}_${key}`,
  ) as IAcItemProvider;
}

/**
 * 获取自填列表项适配器
 *
 * @author zhanghengfeng
 * @date 2024-05-21 17:05:45
 * @export
 * @param {IAppDEACMode} model
 * @return {*}  {(Promise<IAcItemProvider | undefined>)}
 */
export async function getAcItemProvider(
  model: IAppDEACMode,
): Promise<IAcItemProvider | undefined> {
  let provider: IAcItemProvider | undefined;
  const { itemSysPFPluginId, appId } = model;

  // 找插件适配器
  if (itemSysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(itemSysPFPluginId, appId);
    if (pluginKey) {
      provider = getProvider(pluginKey);
    }
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.acItem', {
          pluginKey,
        }),
      );
    } else {
      return provider;
    }
  }

  return provider;
}
