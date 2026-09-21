import { RuntimeError } from '@ibiz-template/core';
import { IAppCounter } from '@ibiz/model-core';
import { IAppCounterProvider } from '../../interface';
import { getPluginRegisterKey } from './common-register';

/** 系统计数器适配器前缀 */
export const APP_COUNTER_PROVIDER_PREFIX = 'APPCOUNTER';

/**
 * 注册系统计数器适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IAppCounterProvider} callback 生成系统计数器适配器的回调
 */
export function registerAppCounterProvider(
  key: string,
  callback: () => IAppCounterProvider,
): void {
  ibiz.register.register(`${APP_COUNTER_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IAppCounterProvider | undefined {
  return ibiz.register.get(
    `${APP_COUNTER_PROVIDER_PREFIX}_${key}`,
  ) as IAppCounterProvider;
}

/**
 * 获取系统计数器适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IAppCounterProvider>}
 */
export async function getAppCounterProvider(
  model: IAppCounter,
): Promise<IAppCounterProvider> {
  let provider: IAppCounterProvider | undefined;
  const { codeName, counterType, sysPFPluginId, appId } =
    model as Required<IAppCounter>;

  // 找插件适配器
  if (sysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) {
      provider = getProvider(pluginKey);
    }
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.adapter', { pluginKey }),
      );
    } else {
      return provider;
    }
  }

  // 自定义的直接通过代码标识去找
  if (counterType === 'CUSTOM') {
    provider = getProvider(codeName);
    if (!provider) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.register.helper.customizedSystemAdapter', {
          codeName,
        }),
      );
    } else {
      return provider;
    }
  }

  // 找系统计数器类型
  provider = getProvider(counterType);
  if (!provider) {
    throw new RuntimeError(
      ibiz.i18n.t('runtime.register.helper.noFoundSystemCounter', {
        counterType,
      }),
    );
  } else {
    return provider;
  }
}
